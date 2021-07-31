import ejs from 'ejs'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

export default (inputConfig) => {

	const __dirname = fileURLToPath(import.meta.url)
	const indexTemplate = fs.readFileSync(path.resolve(__dirname, '../template/package.ejs'))

	const code = ejs.render(indexTemplate.toString(), {
		packageName: inputConfig.packageName,
		middleware: inputConfig.middleware
	})

	return code
}