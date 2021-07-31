const chokidar = require('chokidar');
const { exec, spawn } = require('child_process')

let debounceRestart = debounce(restart, 500)
let childProcess

// One-liner for current directory
chokidar.watch(['main.js']).on('all', (event, path) => {
	console.log(event, path);
	debounceRestart();
});

function restart() {
	console.log('restart')
	childProcess && childProcess.kill()

	childProcess = spawn('node', ['main.js'], {
		stdio: [process.stdin, process.stdout, process.stderr]
	})
}
function debounce(fn, delay) {
	let id
	return () => {
		clearTimeout(id)
		id = setTimeout(() => {
			fn()
		}, delay)
	}
}
// exec('node test.js', (err, stdout) => {
// 	console.log(stdout)
// })