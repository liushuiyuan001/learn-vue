<template>
  <div>
	 <MessageForm @send="handleSend"></MessageForm> 
     <MessageList :messages="messages"></MessageList>
  </div>
</template>

<script setup>
import MessageForm from './components/MessageForm.vue'
import MessageList from './components/MessageList.vue'
import { reactive } from 'vue'
const messages = reactive([])

function handleSend(msg) {
	messages.push(msg)
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
