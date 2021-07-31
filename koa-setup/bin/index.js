#!/usr/bin/env node
import fs from 'fs'
import execa from 'execa'
import createIndexTemplate from './createIndexTemplate.js'
import createPackageTemplate from './createPackageTemplate.js'
import question from './question/index.js'
import { createConfig } from './config.js'

const answers = await question()

const inputConfig = createConfig(answers)
// 1. 创建文件夹 -》 hei
fs.mkdirSync(getRootPath())
// 2. 创建入口文件 -》 index.js
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(inputConfig))
// 3. 创建package
fs.writeFileSync(`${getRootPath()}/package.json`, createPackageTemplate(inputConfig))
// 4 .安装依赖
// todo
execa("yarn", {
	cwd: getRootPath(),
	stdio: [2, 2, 2]
})

function getRootPath() {
	return './hei'
}