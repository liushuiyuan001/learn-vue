
import React, { useState, memo, useCallback, useMemo, useReducer } from 'react';
import 'antd/dist/antd.css';
import './index.css';
// import Child from './Child'


const initState = {
	count: 0
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'add':
			return { count: state.count + 1 }
		case 'decrement':
			return { count: state.count - 1 }
		default: return state
	}
}
const Child = memo((props) => {
	console.log('child-render')
	const [state, dispatch] = useReducer(reducer, initState)
	return (
		<>
			<div>{props.render}</div>
			<div>{state.count}</div>
			{/* <button onClick={() => dispatch({ type: 'add' })}>+</button> */}
			{/* <button onClick={() => dispatch({ type: 'decrement' })}>-</button> */}
		</>
	)
})

const App = (params) => {
	console.log('App-render')

	const [count, setCount] = useState(0)
	const [max, setMax] = useState(10)

	const [list, setList] = useState((new Array(100000)).fill(1))

	const change = (c) => {
		setCount(count + 1)
		if (count > 3) {
			setMax(max + 1)
		}
	}

	const render = useMemo(() => {
		console.log("render-render", count)
		const list = []
		for (let i = 0; i < 100; i++) {
			list.push(<div key={i}>{i}</div>)
		}
		return list
	}, [max])

	return (
		<div>
			<div>{count}</div>
			<button onClick={change}>点击</button>
			{/* {render()} */}
			{/* {list.map((item, index) => {
				return <div key={index}>{item}</div>
			})} */}
			<Child render={render}></Child>
		</div>
	)
}

const Son = memo((props) => {
	return (
		<div>
			{props.list.map((item, index) => {
				return <div key={index}>{item}</div>
			})}
		</div>
	)
})
// export default App

class Li extends React.Component {
	handleClick = (index) => {
		this.props.handleClick(index)
	}
	handleChange = (e, index) => {
		console.log(e, index)
		this.props.handleChange(e.target.value, index)
	}
	render() {
		return (
			<>

			</>
		)
	}
}
// class App extends React.Component {
// 	state = {
// 		list: [{ id: 11, val: 11 }, { id: 12, val: 12 }, { id: 13, val: 13 }, { id: 14, val: 14 }, { id: 15, val: 15 }]
// 	}

// 	handleClick = (index) => {
// 		const listOld = this.state.list
// 		listOld.splice(index, 1)
// 		this.setState({ list: listOld })
// 	}

// 	handleChange = (value, index) => {
// 		const listOld = this.state.list
// 		listOld[index] = value
// 		this.setState({ list: listOld })
// 	}

// 	componentDidMount() {
// 		// const dom = document.getElementById('custom-input')
// 		// dom.addEventListener('compositionstart', e => {
// 		// 	console.log('compositionstart', e.data)
// 		// })
// 		// dom.addEventListener('compositionupdate', e => {
// 		// 	console.log('compositionupdate', e.data)
// 		// })
// 		// dom.addEventListener('compositionend', e => {
// 		// 	console.log('compositionend', e.data)
// 		// })

// 	}

// 	handleLi(e) {
// 		e.preventDefault()
// 		// e.stopPropagation()
// 		console.log('li', e)
// 	}

// 	handleUl(e) {
// 		console.log('ul')
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<ul onClick={this.handleUl}>
// 					<li onClick={this.handleLi}>事件冒泡</li>
// 					{/* <input id="custom-input"></input> */}
// 					{/* {this.state.list.map((item, index) => {
// 						return (
// 							<li key={index} data-list={item.val}>
// 								<input defaultValue={item.val}></input>
// 								<button onClick={() => this.handleClick(index)}>删除</button>
// 							</li>
// 						)

// 						// < Li item = { item } index = { index } handleChange = { this.handleChange } handleClick = { this.handleClick } key = { index } ></>
// 					})} */}
// 				</ul>
// 			</div >
// 		)
// 	}
// }

export default App
// class HorizontalLoginForm extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			name: 'Hello World'
// 		}

// 		console.log('constructor')
// 	}

// 	static getDerivedStateFromProps() {
// 		console.log('getDerivedStateFromProps', arguments);

// 		return null;
// 	}

// 	// getSnapshotBeforeUpdate() {
// 	// 	console.log('getSnapshotBeforeUpdate')
// 	// }

// 	componentDidUpdate() {
// 		console.log('componentDidUpdate')

// 	}

// 	componentDidMount() {
// 		console.log('componentDidMount')
// 	}

// 	change = () => {
// 		const time = new Date().getTime();
// 		this.setState({
// 			name: {
// 				test: 'Hello World' + time
// 			}
// 		})
// 	}

// 	render() {
// 		console.log('render')
// 		return (
// 			<>
// 				<button onClick={this.change}>点击</button>
// 				<Child></Child>
// 			</>
// 		)
// 	}
// }

// export default HorizontalLoginForm