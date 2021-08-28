import React from 'react'
import Title from './title'
import Create from './create'
import Todos from './todos'
import State from './state'
import { useSelector } from 'react-redux'

function App() {
	let data = useSelector(state => state)
	return (<div id="todoapp">
		<Title />
		<div className="content">
			<Create></Create>
			{
				data.length > 0 && <div>
					<Todos></Todos>
					<State></State>
				</div>
			}
		</div>
	</div>
	)
}

export default App
