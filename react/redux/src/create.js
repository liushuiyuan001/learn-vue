import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
function Create() {
	const [val, setVal] = useState('')
	const dispatch = useDispatch()
	return (
		<div id="create-todo">
			<input type="text"
				id="new-todo"
				value={val}
				onChange={({ target }) => {
					setVal(target.value)
				}}
				onKeyDown={({ keyCode }) => {
					if (keyCode === 13 && val.trim()) {
						dispatch({ type: 'TODO_ADD', title: val })
						setVal('')
					}
				}}
				placeholder="请输入要完成的事项"
				autoComplete="off"></input>
		</div>
	)
}

export default Create