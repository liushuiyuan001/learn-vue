import { makeAutoObservable } from 'mobx';

class Timer {
	seconds = 0;
	constructor() {
		makeAutoObservable(this)
	}

	increase = () => {
		this.seconds += 1
	}

	reset = () => {
		this.seconds = 0
	}
}

export default new Timer();