import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Graph, Edge } from '@antv/x6';
const registerNode = () => {
  Graph.registerNode('custom-rect', {
    inherit: 'rect', // 继承自 Shape.Rect
    width: 300, // 默认宽度
    height: 40, // 默认高度
    attrs: {
      body: {
        rx: 10, // 圆角矩形
        ry: 10,
        strokeWidth: 1,
        fill: '#5755a1',
        stroke: '#5755a1',
      },
      label: {
        fill: '#fff',
        fontSize: 18,
        refX: 10, // x 轴偏移，类似 css 中的 margin-left
        textAnchor: 'left', // 左对齐
      }
    },
  })    

  Graph.registerEdge('red-edge', {
    inherit: Edge, // 或 'rect'
    attrs: {
      line: {
        stroke: '#5755a1',
      },
    },
    defaultLabel: {
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        label: {
          fill: 'black',
          fontSize: 14,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          pointerEvents: 'none',
        },
        body: {
          ref: 'label',
          fill: 'white',
          stroke: '#5755a1',
          strokeWidth: 2,
          rx: 4,
          ry: 4,
          refWidth: '140%',
          refHeight: '140%',
          refX: '-20%',
          refY: '-20%',
        },
      },
      position: {
        distance: 100, // 绝对定位
        options: {
          absoluteDistance: true,
        },
      },
    }
  })
}

registerNode()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
