import { SyncHook, AsyncParallelHook } from 'tapable'


class List {
    getRoutes() {

    }   
}

class Car {
	constructor() {
		this.hooks = {
			accelerate: new SyncHook(["newSpeed"]),
			brake: new SyncHook(),
			calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
		};
	}


	setSpeed(newSpeed) {
        // 触发事件
		// following call returns undefined even when you returned values
		this.hooks.accelerate.call(newSpeed);
	}

	useNavigationSystemPromise(source, target) {
		const routesList = new List();
		return this.hooks.calculateRoutes.promise(source, target, routesList).then((res) => {
			// res is undefined for AsyncParallelHook
            console.log('useNavigationSystemPromise')
			return routesList.getRoutes();
		});
	}

	useNavigationSystemAsync(source, target, callback) {
		const routesList = new List();
		this.hooks.calculateRoutes.callAsync(source, target, routesList, err => {
			if(err) return callback(err);
			callback(null, routesList.getRoutes());
		});
	}

	/* ... */
}

// 1. 注册
// 2. 触发

const car = new Car();
car.hooks.accelerate.tap('test1', (speed) => {
    console.log('accelerate', speed);
})


car.hooks.calculateRoutes.tapPromise('test2', (source, target, routesList) => {

    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            console.log('calculateRoutes', source, target, routesList);
            resolve()
        },1000)
    })
})

car.hooks.calculateRoutes.tapPromise('test3', (source, target, routesList) => {

    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            console.log('calculateRoutes3', source, target, routesList);
            resolve()
        },1000)
    })
})

car.setSpeed(10)


car.useNavigationSystemPromise([1,2,3,4,5], 1)