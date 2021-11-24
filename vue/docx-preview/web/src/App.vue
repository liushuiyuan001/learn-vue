<template>
  <div id="app">
    <button @click="goPreview">点击预览</button>
    <button @click="downLoad">点击下载</button>
    <div class="docWrap">
      <!-- 预览文件的地方（用于渲染） -->
      <div ref="file"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const docx = require("docx-preview");
export default {
  name: "App",
  components: {},
  methods: {
    async goPreview() {
      const res = await axios({
        methods: "get",
        responseType: "blob", // 因为是流文件 所以要指定blob类型
        url: "http://localhost:3000/getDoc",
      });
      const { data } = res;
      docx.renderAsync(data, this.$refs.file);
    },
    async downLoad() {
      const { data } = await axios({
        methods: "get",
        responseType: "blob", // 因为是流文件 所以要指定blob类型
        url: "http://localhost:3000/getDoc",
      });
      const blob = new Blob([data]);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "马到成功.docx";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.docWrap {
  width: 900px;
}
</style>
