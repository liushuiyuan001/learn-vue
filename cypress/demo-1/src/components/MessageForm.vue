<template>
	<div>
		<input type="text" data-test="messageText" v-model="message" />
		<button @click="send">send</button>
	</div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const message = ref('')
  const emit = defineEmits(["send"])
  const send = () => {
	  emit('send', message.value)
	  message.value = ''
  }
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
  