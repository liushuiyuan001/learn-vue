import fs from 'fs';
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import path from 'path'
import ejs from 'ejs'
import { transformFromAst } from 'babel-core'
let id = 0

function createAsset(filePath) {
    // 1. 获取文件的内容
    
    const source = fs.readFileSync(filePath, {
        encoding: 'utf8'
    })
    // console.log(source)

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
    
    fs.writeFileSync('./dist/bundle.js', code)
}

build(graph)