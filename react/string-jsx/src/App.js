import { useState } from 'react'
import JsxParser from 'react-jsx-parser'
import { Button } from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

function App() {
  console.log(Button)
  const jsx = `<div>\n    <div onClick={myEventHandler}>{type}-{foo}</div>\n  </div>`

  const [obj, setObj] = useState({       
          foo: 'bar',
          type: 'primary'
  })

  return (
    <div>
      <div>123456</div>
      <JsxParser
        blacklistedAttrs={[]}
        bindings={{
          ...obj,
          myEventHandler: (e) => {
            setObj({ 
              ...obj,
              type: 'text'
            })
            console.log('first', e)
          }
        }}
        components={{ Button }}
        jsx={jsx}
      />

    </div> 
  );
}

export default App;
