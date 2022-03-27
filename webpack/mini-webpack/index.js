import fs from 'fs';
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import path from 'path'
import ejs from 'ejs'
import { transformFromAst } from 'babel-core'
import { jsonLoader } from './jsonLoader.js'
import { changeOutputPlugin } from './changeOutputPlugin.js'
import { SyncHook } from 'tapable'
let id = 0


const webpackConfig = {
    module: {
        rules: [
            {
                test: /\.json$/,
                use: [jsonLoader]
            }
        ]
    },
    plugins: [
        new changeOutputPlugin()
    ]
}

const hooks = {
    emitFile: new SyncHook(['context'])
}

function createAsset(filePath) {
    // 1. 获取文件的内容
    
    let source = fs.readFileSync(filePath, {
        encoding: 'utf8'
    })
    // console.log(source)

    //initLoader 
    const loaders = webpackConfig.module.rules
    const loaderContext = {
        addDeps(dep) {
            console.log('addDeps', dep)
        }
    }

    for (const loader of loaders) {
        const { test, use } = loader
        if(test.test(filePath)) {
            if(Array.isArray(use)) {
                use.reverse().forEach(fn => {
                    source = fn.call(loaderContext,source)
                })
            }
        }
    }

    // 2. 获取依赖关系
    const ast = parser.parse(source, { 
        sourceType: 'module'
    })


    const deps = []
    traverse.default(ast, {
        ImportDeclaration({ node }) {
            deps.push(node.source.value)
        }
    })

    const { code }  = transformFromAst(ast, null, {
        presets: ["env"]
    })


    return {
        filePath,
        code,
        deps,
        id: id++,
        mapping: {}
    }

}

// 3. 遍历图
function createGraph () {
    const mainAsset = createAsset("./example/main.js")
    const queue = [mainAsset]

    for (const asset of queue) {
        for (const relativePath of asset.deps) {
            const child = createAsset(path.resolve("./example", relativePath))
            asset.mapping[relativePath] = child.id
            queue.push(child)
        }
    }

    return queue

}

function initPlugins() {
    const plugins = webpackConfig.plugins

    plugins.forEach( plugin => {
        plugin.apply(hooks)
    })
}

initPlugins()

const graph = createGraph()



function build (graph) {
    const template = fs.readFileSync("./bundle.ejs", { encoding: "utf8" })

    const data = graph.map( asset => {
        return {
            filePath: asset.filePath,
            code: asset.code,
            mapping: asset.mapping,
            id: asset.id
        }
    })

    const code = ejs.render(template, { data })

    let output = './dist/bundle.js'
    const context = {
        changeOutputPlugin(path) {
            output = path
        }
    }
    hooks.emitFile.call(context)

    fs.writeFileSync(output, code)
}

build(graph)