import './App.css';
import { useState, useEffect } from 'react'
import { Graph, Shape } from '@antv/x6';

function App() {

  const data = {
    // 节点
    nodes: [
      {
        id: 'node1', // String，可选，节点的唯一标识
        x: 40,       // Number，必选，节点位置的 x 值
        y: 40,       // Number，必选，节点位置的 y 值
        width: 80,   // Number，可选，节点大小的 width 值
        height: 40,  // Number，可选，节点大小的 height 值
        label: 'hello', // String，节点标签
        attrs: {
          body: {
            fill: '#2ECC71',
            stroke: '#000',
            strokeDasharray: '10,2',
          },
          label: {
            text: 'Hello',
            fill: '#333',
            fontSize: 13,
          }
        }
      },
      {
        id: 'node2', // String，节点的唯一标识
        shape: 'custom-rect', // 使用 ellipse 渲染
        x: 160,      // Number，必选，节点位置的 x 值
        y: 180,      // Number，必选，节点位置的 y 值
        width: 80,   // Number，可选，节点大小的 width 值
        height: 40,  // Number，可选，节点大小的 height 值
        label: 'world', // String，节点标签
        // attrs: {
        //   body: {
        //     fill: '#F39C12',
        //     stroke: '#000',
        //     rx: 16,
        //     ry: 16,
        //   },
        //   label: {
        //     text: 'World',
        //     fill: '#333',
        //     fontSize: 18,
        //     fontWeight: 'bold',
        //     fontVariant: 'small-caps',
        //   },
        // },
      },
    ],
    // 边
    edges: [
      {
        source: 'node1', // String，必须，起始节点 id
        target: 'node2', // String，必须，目标节点 id
        shape: 'red-edge',
        label: 'Custom Edge',
        // attrs: {
        //   line: {
        //     stroke: 'orange',
        //   },
        // },
      },
    ],
  };

  const [graph, setGraph] = useState(null)

  const testCell = (graph) => {
    const rect = new Shape.Rect({
      id: 'node3',
      x: 400,
      y: 400,
      width: 100,
      height: 40,
      label: 'rect', 
      zIndex: 2,
      ports: [
        { id: 'port1' }, 
        // { id: 'port2' }, 
        // { id: 'port3' },
      ]
    })
    
    const circle = new Shape.Rect({
      id: 'node4',
      x: 280,
      y: 200,
      width: 60,
      height: 60,
      label: 'circle', 
      zIndex: 2,
      ports: [
        { id: 'port1' }, 
        // { id: 'port2' }, 
        // { id: 'port3' },
      ]
    })
    
    const edge = new Shape.Edge({
      id: 'edge1',
      source: rect,
      target: circle,
      zIndex: 1,

    })
    
    graph.addNode(rect)
    graph.addNode(circle)
    // graph.addEdge(edge)
  }

  useEffect(() => {

    
    const graph = new Graph({
      container: document.getElementById('container'),
      width: 800,
      height: 600,
      background: {
        color: '#fffbe6'
      },
      connecting: {
        snap: true,
      },
      grid: {
        size: 10,
        visible: true,
      }
    });

    setGraph(graph)

    // graph.fromJSON(data)

    testCell(graph)

  },[])

  const handleClick = () => {
    // graph.zoom(-0.5)
    graph.translate(80,40)
  }


  return (
    <div className="App">
      <div id="container">
      </div>
      <button onClick={handleClick}>点击</button>

    </div>
  );
}


export default App;