<template>
  <div>
	  <ul>
		  <li v-for="(message, i) in messages" :key="i">{{message}}</li>
	  </ul>
  </div>
</template>

<script setup>
defineProps(["messages"])
</script>

<style>

</style>