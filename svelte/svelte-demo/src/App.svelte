<script>
	let name = 'World';
	let count = 0

	function handleClick() {
		count += 1;
	}
	function handleChane(e) {
		name = e.targer.value;
	}
</script>

<main>
	<!-- <h1>Hello {name}!</h1> -->
	<input bind:value={name} on:change={handleChane}/>
	<!-- <button on:click={handleClick}>点击</button> -->
	<div>{count}</div>
	<!-- <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>