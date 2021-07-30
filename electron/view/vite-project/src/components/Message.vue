<template>
	<div>
		<ul>
			<li :key="index" v-for="(item,index) in message">
			  {{ item.text }}
			</li>
		</ul>
	</div>
</template>
<script setup>
import axios from 'axios'
import { ref } from 'vue'
let message = ref([])
setInterval(async () => {
	const { data } =  await axios.get('/api/room_history')
	message.value.push(...data.data)
},1000)
</script>