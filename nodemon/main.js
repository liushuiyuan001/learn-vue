const Koa = require('koa');
const app = new Koa();

app.use((ctx) => {
	ctx.body = 'hi my name is liu222212121121'
})


app.listen(3000)

// nodemon
// 1.当代码改变的时候监听文件
//  - fs.watch()
//  - chokidar
// 2. 重新启动服务(重新杀死进程)
// - node main.js -> command
// - nodejs -> exec | spawn
