let fs = require('fs');

fs.readFile('./a.txt', 'utf8', function (err, data) {
	fs.readFile(data, 'utf8', function (err, data) {
		fs.readFile(data, 'utf8', function (err, data) {
			console.log(data)
		})
	})
})

function read(url) {
	return new Promise(function (resolve, reject) {
		fs.readFile(url, 'utf8', function (err, data) {
			err && reject(err);
			console.log('read', data);
			resolve(data);
		})
	})
}

read('./a.txt').then(data => {
	return read(data)
}).then(data => {
	return read(data)
}).then(data => {
	console.log('finished', data)
})

async function testAwait() {
	const data1 = await read('./a.txt')
	const data2 = await read(data1)
	const data3 = await read(data2)
	console.log('data3', data3)
}
testAwait()