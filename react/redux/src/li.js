import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Li(props) {
	const { id, title, done } = props
	const [isEdit, changeEdit] = useState(false)
	const dispatch = useDispatch()
	const edit = useRef()
	const [val, setVal] = useState('')
	useEffect(() => {
		if (isEdit) {
			edit.current.focus()
		}
	}, [isEdit])
	return (
		<li className={isEdit ? 'editing' : ''}>
			<div className={"todo " + (done ? 'done' : '')}>
				<div className="display">
					<input
						type="checkbox"
						className="check"
						checked={done}
						onChange={({ target }) => {
							dispatch({
								type: 'TODO_DONE',
								id,
								done: target.checked
							})
						}}
					></input>
					<div
						className="todo-content"
						onDoubleClick={() => {
							changeEdit(true)
						}}
					>{title}</div>
					<span className="todo-destroy"
						onClick={() => {
							dispatch({ type: 'TODO_REMOVE', id })
						}}
					></span>
				</div>
				<div className="edit">
					<input
						ref={edit}
						value={val}
						onChange={({ target }) => {
							setVal(target.value)
						}}
						onBlur={() => {
							if (val.trim()) {
								dispatch({
									type: 'TODO_EDIT',
									id,
									title: val
								})
							} else {
								setVal(title)
							}
							changeEdit(false)
						}}
						type="text"
						className="todo-input" placeholder="请输入">

					</input>
				</div>
			</div>
		</li>
	)
}

export default Li
