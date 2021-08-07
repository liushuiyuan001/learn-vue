const esbuild = require('esbuild');
const axios = require('axios');

const myPlugin = {
	name: 'http-url',
	setup(build) {
		// console.log(build)
		// onResove
		build.onResolve({ filter: /^https?:\/\// }, (args) => {
			// console.log(args)
			return {
				path: args.path,
				namespace: "http-url"
			}
		})

		build.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => {
			return {
				namespace: "http-url",
				path: new URL(args.path, args.importer).toString()
			}
		})
		// onLoad
		build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
			// console.log(args)
			const { data } = await axios(args.path)
			return {
				contents: data
			}
		})
	}
}
esbuild.build({
	entryPoints: ['app.js'],
	bundle: true,
	outfile: 'out.js',
	plugins: [myPlugin]
})