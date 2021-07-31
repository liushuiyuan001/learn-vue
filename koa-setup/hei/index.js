
	const serve = require('koa-static')

	const Koa = require('koa');
    
	const app = new Koa();

	app.use(serve(__dirname + "/static"))
 


    const Router = require("koa-router");
	const router = new Router();
    router.get('/', (ctx) => {
		ctx.body = "hello  koa-setup-test"
	})
    
	app.use(router.routes())
 
app.listen(8000, () => {
	console.log("open server localhost:8000");
});