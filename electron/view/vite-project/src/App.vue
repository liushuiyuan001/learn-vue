<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
const data =  await axios.get('/api/xlive/web-room/v1/dM/gethistory?roomid=21877310')
console.log('data', data)
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
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
