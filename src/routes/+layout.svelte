<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
import '../app.css';
</script>


<main class="font-mono">
	<Navbar />
	<slot />
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		width: 100%;
		max-width: 80rem;
		padding: 0 2rem;
		position: relative;
	}
</style>