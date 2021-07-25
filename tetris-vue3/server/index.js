const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const options = {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST']
	}
}
const io = require('socket.io')(server, options);
io.on('connection', (socket) => {
	console.log("connection")
	socket.emit("msg", "nihaoya")


	socket.on('moveBoxToLeft', () => {
		console.log('left')
		//socket.broadcast 
		socket.broadcast.emit("moveBoxToLeft")
	})

	socket.on('moveBoxToRight', () => {
		console.log('right')
		socket.broadcast.emit("moveBoxToRight")
	})

	socket.on('moveBoxToDown', () => {
		console.log('down')
		socket.broadcast.emit("moveBoxToDown")
	})

	socket.on('rotateBox', () => {
		console.log('rotateBox')
		socket.broadcast.emit("rotateBox")
	})
});
server.listen(3001);