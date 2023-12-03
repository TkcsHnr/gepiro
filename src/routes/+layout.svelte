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
		width: 100%;
		max-width: 80rem;
		padding: 0 1rem 2rem 1rem !important;
		position: relative;
	}
</style>