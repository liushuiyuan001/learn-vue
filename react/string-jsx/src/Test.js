import { useState } from 'react'
function App() {
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(count+1);
    }
    return (
        <main>
            <button onClick={handleClick}>点击</button>
            <div>{count}</div>
        </main>
    )
}
export default App