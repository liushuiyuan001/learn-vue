import { useState } from 'react'
import './App.css';
import Child from './child';
import { Provider } from './context'

function App() {
	const [state, setState] = useState('要传递给子级的数据1')

	return (
		<Provider value={{ info: state, changeContext: setState }}>
			<Child />
		</Provider>
	);
}

export default App;
