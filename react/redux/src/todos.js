import React from 'react'
import { useSelector } from 'react-redux'
import Li from './li'
function Todos() {
	const data = useSelector(state => state)
	return (
		<ul id="todo-list">
			{
				data.map((item) => (<Li key={item.id} {...item}></Li>))
			}
		</ul>
	)
}

export default Todos
