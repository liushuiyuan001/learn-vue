import { useState, useRef, useMemo, MutableRefObject } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useVirtualList } from './hook'

function App() {
  const [count, setCount] = useState(0)
  const originalList = useMemo(() => Array.from(Array(99999).keys()), []);
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  const [list] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 52,
    overscan: 10,
  });

  // console.log('list', list)
  
  return (
    <>
      <div className='content' ref={containerRef}>
        <div className='target' ref={wrapperRef}>
          {list.map(item => {
            return (<div className='item' style={item.style} key={item.index}>
              row: {item.data}
            </div>)
          })}
        </div>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
