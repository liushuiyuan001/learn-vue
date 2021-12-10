import React, { Component, PureComponent } from 'react'

export default class Child extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
		}
		console.log('child-constructor')
	}

	static getDerivedStateFromProps() {
		console.log('child-getDerivedStateFromProps', arguments);
		return null
	}

	// getSnapshotBeforeUpdate() {
	// 	console.log('child-getSnapshotBeforeUpdate')
	// }

	componentDidUpdate() {
		console.log('child-componentDidUpdate')
	}

	componentDidMount() {
		console.log('child-componentDidMount')
	}

	render() {
		console.log('child-render')
		return (
			<div>
				{/* {this.props.name} */}
			</div>
		)
	}
}
