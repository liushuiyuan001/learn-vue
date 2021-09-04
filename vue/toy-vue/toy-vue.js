export class ToyVue {
	constructor(config) {
		this.template = document.querySelector(config.el)
		this.data = reactive(config.data)

		for (const name in config.methods) {
			this[name] = () => {
				config.methods[name].apply(this.data)
			}
		}

		this.traverse(this.template)
	}

	traverse(node) {
		console.log('node', node)
		if (node.nodeType === Node.TEXT_NODE) {
			if (node.textContent.trim().match(/^{{([\s\S]+)}}$/)) {
				const name = RegExp.$1.trim()
				console.log('name', name)
				effect(() => node.textContent = this.data[name])
			}
		}
		if (node.nodeType === Node.ELEMENT_NODE) {
			const attributes = node.attributes
			for (const attribute of attributes) {
				console.log(attribute)
				if (attribute.name.match(/^v-bind:([\s\S]+)$/)) {
					const attributeName = RegExp.$1
					const value = attribute.value
					effect(() => node.setAttribute(attributeName, value))
				}
				if (attribute.name === 'v-model') {
					const name = attribute.value
					effect(() => node.value = this.data[name])
					node.addEventListener("input", e => this.data[name] = node.value)
				}
				if (attribute.name.match(/^v-on:([\s\S]+)$/)) {
					const eventName = RegExp.$1
					const fn = attribute.value
					node.addEventListener(eventName, this[fn])
				}

			}
		}
		if (node.childNodes && node.childNodes.length) {
			for (const child of node.childNodes) {
				this.traverse(child)
			}
		}
	}

}

let effects = new Map()

let currentEffect = null
function effect(fn) {
	currentEffect = fn
	fn()
	currentEffect = null
}

function reactive(object) {
	const observer = new Proxy(object, {
		get(object, property) {
			if (currentEffect) {
				if (!effects.has(object)) {
					effects.set(object, new Map());
				}
				if (!effects.get(object).get(property)) {
					effects.get(object).set(property, new Array())
				}
				effects.get(object).get(property).push(currentEffect)
			}

			return Reflect.get(object, property)
		},
		set(object, property, value) {
			const val = Reflect.set(object, property, value)
			if (effects.has(object) && effects.get(object).has(property)) {
				for (const e of effects.get(object).get(property)) {
					e()
				}
			}
			return val
		}
	})
	return observer
}

// let dummy
// let counter = reactive({ num: 1 })

// effect(() => (dummy = counter.num))

// console.log(dummy)
// counter.num = 7
// console.log(dummy)