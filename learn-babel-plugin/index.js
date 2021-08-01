module.exports = ({ types: t }) => {
	return {
		visitor: {
			// TODO
			Identifier(path) {
				// console.log(path.node.name)
				const parentIsIf = t.isIfStatement(path.parentPath)
				const name = path.node.name
				const isDebug = name === 'DEBUG'
				if (isDebug && parentIsIf) {
					// 把Identifier转换为string
					const stringNode = t.stringLiteral("DEBUG")
					path.replaceWith(stringNode)
				}
			},

			StringLiteral(path) {
				const parentIsIf = t.isIfStatement(path.parentPath)
				const name = path.node.value
				const isDebug = name === 'DEBUG'
				if (isDebug && parentIsIf) {
					path.parentPath.remove()
				}
			}
		}
	}
};