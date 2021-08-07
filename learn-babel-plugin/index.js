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

			StringLiteral(path, state) {
				const parentIsIf = t.isIfStatement(path.parentPath)
				const name = path.node.value
				const isDebug = name === 'DEBUG'
				if (isDebug && parentIsIf) {
					// 控制在 prod 下 才能移除
					console.log(state)
					if (process.env.NODE_ENV === 'production') {
						path.parentPath.remove()
					}
				}
			}
		}
	}
};