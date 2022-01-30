<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="test">Test {{mainStore.name}}</div>
  <n-button>naive-ui</n-button>

  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { useMainStore } from "./store/main";
import { NButton } from "naive-ui"

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,NButton
  },
  setup() {
	  return { 
		  mainStore: useMainStore()
	  }
  }
});
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.test {
	color: $test-color;
}
</style>
