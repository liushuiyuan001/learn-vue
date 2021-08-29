import React from 'react'
import { connect } from 'react-redux'
import Li from './li'
function Todos(props) {
	// render() {
	const data = props.data || []
	return (
		<ul id="todo-list">
			{
				data.map((item) => (<Li key={item.id} {...item}></Li>))
			}
		</ul>
	)
	// }
}
function mapStateToProps(state) {
	return {
		data: state
	}
}
export default connect(mapStateToProps)(Todos)
