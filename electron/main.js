const { app, BrowserWindow } = require('electron')
function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600
	})

	// win.loadFile('index.html')
	const url = `http://localhost:3000`
	win.loadURL(url)
}
app.whenReady().then(() => {
	createWindow()
})

