<template>
	<div>
	   <h1>{{ 'Hello bilibibli' }}</h1>
	   <Message></Message>	
	</div>
</template>

<script setup>
import Message from './components/Message.vue'
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
</style>
