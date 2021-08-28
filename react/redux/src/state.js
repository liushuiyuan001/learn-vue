import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

function State() {
	const data = useSelector(state => state)
	const undone = data.filter(item => !item.done)
	const done = data.filter(item => item.done)
	const dispatch = useDispatch()
	return (
		<div id="todo-stats">
			<span className="todo-count">
				<span className="number">{undone.length}</span>
				<span className="word">项待完成</span>
			</span>
			{
				done.length > 0 && <span className="todo-clear">
					<button onClick={() => {
						dispatch({ type: 'TODO_REMOVE_DONE' })
					}}>
						Clear <span>{done.length}</span> 已完成事项
					</button>
				</span>
			}
		</div>
	)
}

export default State
