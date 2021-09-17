function render(vnode, container) {
	console.log('vnode', vnode);
	const node = createNode(vnode)
	container.appendChild(node)
}

function createNode(vnode) {
	let node
	const { type } = vnode
	if (typeof type === 'string') {
		node = updateHostComponents(vnode)
	} else if (typeof type === 'function') {
		console.log('typetypetype', type.prototype.isReactComponent)
		if (type.prototype.isReactComponent) {
			node = updateClassComponents(vnode)
		} else {
			node = updateFunctionComponents(vnode)
		}
	}
	else {
		node = updateTextComponents(vnode)
	}
	return node
}

function updateHostComponents(vnode) {
	const { type, props } = vnode
	const node = document.createElement(type)
	updateNode(node, props)
	reconcileChildren(node, props.children)
	return node
}

function updateNode(node, props) {
	Object.keys(props)
		.filter(k => k !== 'children')
		.forEach(k => node[k] = props[k])
}

function updateTextComponents(vnode) {
	return document.createTextNode(vnode)
}

function updateFunctionComponents(vnode) {
	const { type, props } = vnode
	const vvnode = type(props)
	return createNode(vvnode)
}

function updateClassComponents(vnode) {
	const { type, props } = vnode
	const instance = new type(props)
	const vvnode = instance.render()
	return createNode(vvnode)
}
function reconcileChildren(node, children) {
	const newChildren = Array.isArray(children) ? children : [children]
	for (const child of newChildren) {
		if (typeof child !== 'undefined') {
			render(child, node)
		}
	}
}

const Dom = {
	render
}
export default Dom