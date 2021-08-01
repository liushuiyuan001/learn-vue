const { transformSync } = require('@babel/core');
const myPlugin = require('./index.js')

// 我们就可以使用我们的插件了


const code = `
      console.log("click");
      // 有一些逻辑 只需要在dev环境下执行
      if (DEBUG) {
        const a = 10;
        const b = 20;
        console.log(a + b);
      }
`

const babelConfig = {
	plugins: ['./index.js']
}
const output = transformSync(code, babelConfig)
console.log(output)