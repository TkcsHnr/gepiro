<script lang="ts">
	import { keyboard, duration } from '$lib/stores/settings';

	import ThemeSelector from '$lib/components/ThemeSelector.svelte';
</script>

<div class="settings">
	<div class="flex items-center gap-4">
		<p>Show keyboard:</p>
		<input type="checkbox" bind:checked={$keyboard} class="toggle toggle-primary" />
	</div>

	<div class="flex flex-col gap-4">
        <p>Select theme:</p>
        <ThemeSelector />
    </div>
</div>

<style lang="scss">
	div.settings {
		height: 100%;
		display: flex;
		flex-direction: column;
		max-width: 60rem;
		justify-content: center;
		gap: 2rem;
	}
	p {
		font-size: 1.5rem;
	}
</style>
