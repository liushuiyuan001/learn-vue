<script setup>
  import { ref } from '@vue/reactivity'
	let count = ref(0)
	const handleClick = () => {
		count.value += 1;
	}
</script>
<template>
<main>
	<button @click='handleClick'>点击</button>
	<div>{{count}}</div>
</main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
