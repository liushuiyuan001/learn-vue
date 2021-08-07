const esbuild = require('esbuild');
// env.js
(async function () {
	const r = await esbuild.build({
		entryPoints: ["app.jsx"],
		bundle: true,
		outfile: "out.js",
	})
	console.log(r)
})()