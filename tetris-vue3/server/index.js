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
		// io.emit("moveBoxToLeft")
		socket.broadcast.emit("moveBoxToLeft")
	})

	socket.on('moveBoxToRight', () => {
		console.log('right')
		// io.emit("moveBoxToRight")
		socket.broadcast.emit("moveBoxToRight")
	})

	socket.on('moveBoxToDown', () => {
		console.log('down')
		// io.emit("moveBoxToDown")
		socket.broadcast.emit("moveBoxToDown")
	})

	socket.on('rotateBox', () => {
		console.log('rotateBox')
		// io.emit("rotateBox")
		socket.broadcast.emit("rotateBox")
	})

	socket.on('createBox', (info) => {
		console.log('createBox')
		// io.emit("createBox", info)
		socket.broadcast.emit("createBox", info)
	})
});
server.listen(3001);