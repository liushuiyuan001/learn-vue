import './App.css';
import { useEffect } from 'react'
import { Subject, Observable, range, filter, map, fromEvent, scan, throttleTime } from 'rxjs';
// range(1, 20)
// 	.pipe(
// 		filter(x => x % 2 === 1),
// 		map(x => x + x)
// 	)
// 	.subscribe(x => console.log(x));

function App() {

	let count = 0;

	useEffect(() => {
		const btn = document.querySelector('button')
		// btn.addEventListener('click', () => {
		// 	count++;
		// 	console.log(count);
		// })
		// fromEvent(btn, 'click').pipe(
		// 	throttleTime(1000),
		// 	scan(count => count + 1, 0),
		// )
		// 	.subscribe(x => console.log(x))

		var observable = new Observable(function (observer) {
			observer.next(1);
			observer.next(2);
			observer.next(3);
			setTimeout(() => {
				observer.next(4);
				observer.complete();
			}, 2000);
		});

		console.log('just before subscribe');
		const subscription = observable.subscribe({
			next: x => console.log('got value ' + x),
			error: err => console.error('something wrong occurred: ' + err),
			complete: () => console.log('done'),
		});
		console.log('just after subscribe');
		// subscription.unsubscribe() // 会中断当前订阅的未执行的异步请求
		// subscription.add 将一个子订阅者对象传入进去 这样的话可以暂停两个订阅者
		// subscription.remove 删除子订阅者
		console.log('just before subscribe1');
		// subscribe() 里面的参数就是观察者，观察者中有next error complete三个方法  
		observable.subscribe({
			next: x => console.log('got value1 ' + x),
			error: err => console.error('something wrong occurred1: ' + err),
			complete: () => console.log('done1'),
		});
		console.log('just after subscribe1');

		var subject = new Subject();
		subject.subscribe({
			next: (v) => console.log('observerA: ' + v)
		});
		subject.subscribe({
			next: (v) => console.log('observerB: ' + v)
		});

		subject.next(1);
		subject.next(2);
	}, [])
	return (
		<div className="App">
			<button className="button">按钮</button>
		</div>
	);
}

export default App;
