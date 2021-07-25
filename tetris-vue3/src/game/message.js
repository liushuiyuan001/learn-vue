// socket
// socket.io -> 
// 防腐层
import { io } from 'socket.io-client'

let socket
export function initMessage() {
	socket = io('http://localhost:3001')
	socket.on("connect", () => {
		console.log('链接成功')
	})


	// socket.on('msg', (info) => {
	// 	console.log(info)
	// })
}

export const message = {
	on(...args) {
		return socket.on(...args)
	},
	emit(...args) {
		return socket.emit(...args)
	}

}

// io -> on  io- > emit
export function onMessage(...args) {
	return socket.on(...args)
}