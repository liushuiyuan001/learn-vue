import Obj from './a.js';
const NAME = Symbol('name')
Obj[NAME] = '李四'

console.log(Obj)

const s1 = Symbol('zs')
const s2 = Symbol('zs')

console.log(s1 === s2)
console.log(typeof s1)



let test = {
	id: 2,
	fn: function () {
		console.log(this.id)
	}
}

console.log(test.fn())

let test1 = {
	id: 2,
	fn: function () {
		console.log(this.id)
	}
}

console.log(test1.fn())
