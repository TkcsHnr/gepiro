<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	import { onKeyDown, onKeyUp } from '$lib/scripts/keyboardListener';

	import { keyboard } from '$lib/stores/options';
	import RestartButton from '$lib/components/RestartButton.svelte';
	import Results from '$lib/components/Results.svelte';
	import { appState } from '$lib/stores/stores';
	import Timer from '$lib/components/Timer.svelte';
</script>

<div class="main">
	{#if $appState == 'results'}
		<Results />
	{/if}

	<RestartButton />

	{#if $appState != 'results'}
		<Timer />
		<TextArea></TextArea>
	{/if}

	{#if $keyboard && $appState != 'results'}
		<Keyboard></Keyboard>
	{/if}
</div>
<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<style lang="scss">
	div.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		max-width: 75rem;
	}
</style>
