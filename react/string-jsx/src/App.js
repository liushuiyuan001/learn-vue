import React, { useState } from 'react'
import JsxParser from './JsxParser'

import { Button } from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

function App() {

  const jsx = `<div>\n    <Button onClick={myEventHandler} type={type}>{type}-{foo}</Button>\n  </div>`

  const [obj, setObj] = useState({       
      foo: 'bar',
      type: 'primary'
  })

  return (
    <div>
      <div>123456</div>
      <JsxParser
        jsx={jsx}
        components={{ Button }}
        bindings={{
          ...obj,
          myEventHandler: (e) => {
            setObj({ 
              ...obj,
              type: 'danger'
            })
          }
        }}
      />
    </div> 
  );
}

export default App;
