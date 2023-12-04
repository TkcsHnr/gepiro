<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	import { onKeyDown, onKeyUp } from '$lib/scripts/keyboardListener';

	import { keyboard } from '$lib/stores/settings';
	import RestartButton from '$lib/components/RestartButton.svelte';
	import Results from '$lib/components/Results.svelte';
	import { appState } from '$lib/stores/stores';
	import Timer from '$lib/components/Timer.svelte';
</script>

<svelte:head>
	<title>Teszt</title>
</svelte:head>

<div class="h-full flex flex-col items-center justify-center">
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
	{:else}
		<div class="h-32"></div>
	{/if}
</div>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
