import { defineStore } from 'pinia';

export default defineStore('pinia', {
	state: () => {
		return {
			counter: 0
		}
	},
	actions: {
		increment() {
			this.counter++;
		}
	},
	getters: {
		double() {
			return this.counter * 2
		}
	}
})