const Koa = require('koa');
const app = new Koa();
const Router = require("koa-router");
const router = new Router()
const rootHistory = require('./rootHistory');
// app.use(async ctx => {
// 	ctx.body = 'Hello World';
// });

router.get("/room_history", rootHistory);

app.use(router.routes());

app.listen(8080, () => {
	console.log('server success localhost:8080')
});
