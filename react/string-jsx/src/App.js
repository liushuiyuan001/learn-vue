import React, { useState } from 'react'
import JsxParser from './JsxParser'

import { Button } from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

function App() {

  const jsx = `<div>\n    <Button onClick={myEventHandler} type={type === 'danger' ? 'primary' : 'danger'} >{type}-{foo}-{show ? '1' : '0'}</Button>\n  </div>`

  const [obj, setObj] = useState({       
      foo: 'bar',
      type: 'primary',
      show: true,
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
              show: !obj.show,
              type: !obj.show ? 'danger' : 'primary'
            })
          }
        }}
      />
    </div> 
  );
}

export default App;
