let wipRoot = null // 进行当中的fiber
function render(vnode, container) {
	// console.log('vnode', vnode);
	// const node = createNode(vnode)
	// container.appendChild(node)
	wipRoot = {
		type: 'div',
		props: {
			children: {
				...vnode
			}
		},
		stateNode: container
	}
	nextUnitOfWork = wipRoot
}

function createNode(workInProgress) {
	const { type, props } = workInProgress
	const node = document.createElement(type)
	updateNode(node, props)
	return node
}

function updateHostComponents(workInProgress) {
	// const { type, props } = workInProgress
	if (!workInProgress.stateNode) {
		workInProgress.stateNode = createNode(workInProgress)
	}

	reconcileChildren(workInProgress, workInProgress.props.children)
}

function updateNode(node, props) {
	Object.keys(props)
		.forEach(k => {
			if (k === 'children') {
				if (typeof props[k] === 'string') {
					node.textContent = props[k]
				}
			} else {
				node[k] = props[k]
			}
		})
}

function updateTextComponents(workInProgress) {
	if (!workInProgress.stateNode) {
		workInProgress.stateNode = document.createTextNode(workInProgress.props)
	}
}

function updateFunctionComponents(workInProgress) {
	const { type, props } = workInProgress
	const children = type(props)
	reconcileChildren(workInProgress, children)
}

function updateClassComponents(workInProgress) {
	const { type, props } = workInProgress
	const instance = new type(props)
	const children = instance.render()
	reconcileChildren(workInProgress, children)
}

function reconcileChildren(workInProgress, children) {
	if (typeof children === 'string' || typeof children === 'number') {
		return
	}
	const newChildren = Array.isArray(children) ? children : [children]
	let previousNewFiber = null
	for (let i = 0; i < newChildren.length; i++) {
		// render(child, node)
		const child = newChildren[i]
		let newFiber = {
			type: child.type,
			props: { ...child.props },
			stateNode: null,
			child: null,
			sibling: null,
			return: workInProgress
		}

		if (typeof child === 'string') {
			newFiber.props = child
		}

		if (i === 0) {
			workInProgress.child = newFiber
		} else {
			previousNewFiber.sibling = newFiber
		}

		previousNewFiber = newFiber
	}
}

// 下一个单元任务 fiber
let nextUnitOfWork = null;

// fiber
// type 类型
// key
// props 属性
// stateNode
// child 第一个子节点
// sibling 下一个兄弟节点
// return 父节点

function performUnitOfWork(workInProgress) {
	// 1. 执行任务
	const { type } = workInProgress
	console.log('workInProgress', workInProgress)
	if (typeof type === 'string') {
		// 原生标签节点
		updateHostComponents(workInProgress)
	} else if (typeof type === 'function') {
		if (type.prototype.isReactComponent) {
			updateClassComponents(workInProgress)
		} else {
			updateFunctionComponents(workInProgress)
		}
	} else if (typeof type === 'undefined') {
		updateTextComponents(workInProgress)
	}

	// 2. 返回下一个执行任务
	// 王朝的故事
	if (workInProgress.child) {
		return workInProgress.child
	}
	let nextFiber = workInProgress
	while (nextFiber) {
		if (nextFiber.sibling) {
			return nextFiber.sibling
		}
		nextFiber = nextFiber.return
	}
}

function workLoop(IdleDeadline) {
	while (nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
		// 执行任务 并且返回下一个执行任务
		nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
	}

	if (!nextUnitOfWork && wipRoot) {
		commitRoot()
	}
}

requestIdleCallback(workLoop)

function commitRoot() {
	commitWork(wipRoot.child)
	wipRoot = null
}

function commitWork(workInProgress) {
	// 提交自己
	if (!workInProgress) {
		return
	}

	let parentNodeFiber = workInProgress.return
	// 父fiber一定有dom节点
	while (!parentNodeFiber.stateNode) {
		parentNodeFiber = parentNodeFiber.return
	}
	const parentNode = parentNodeFiber.stateNode //dom节点
	if (workInProgress.stateNode) {
		parentNode.appendChild(workInProgress.stateNode)
	}
	// 提交兄弟节点
	commitWork(workInProgress.sibling)
	// 提交子节点
	commitWork(workInProgress.child)
}

const Dom = {
	render
}
export default Dom