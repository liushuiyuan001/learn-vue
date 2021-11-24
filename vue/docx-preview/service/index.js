const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.get('/getDoc', (req, res) => {

	const docxUrl = './doc/test.docx'

	// 允许跨越
	res.header("Access-Control-Allow-Origin", "*")

	// 设置请求头
	res.writeHead(200, {
		// 指定文件类型为docx
		'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	})

	// 创建可读流
	const readStream = fs.createReadStream(docxUrl)

	// 将读取的结果以管道pipe流的方式返回给前端
	readStream.pipe(res)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})