<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	import { onKeyDown, onKeyUp } from '$lib/scripts/keyboardListener';

	import { keyboard } from '$lib/stores/settings';
	import RestartButton from '$lib/components/RestartButton.svelte';
	import Results from '$lib/components/Results.svelte';
	import { appState } from '$lib/stores/stores';
	import Timer from '$lib/components/Timer.svelte';

	import { onMount } from 'svelte';
	import { generateWords } from '$lib/scripts/wordGenerator';
	import { assignWraps } from '$lib/scripts/wrapHandler';
	import { focusInput } from '$lib/scripts/focusInput';

	onMount(() => {
		// max 200 wpm-nyi szó
		generateWords().then(() => {
			assignWraps();
			focusInput();
		});
	});
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
		<div class="h-8"></div>
		{#if $keyboard}
			<Keyboard></Keyboard>
		{:else}
			<div class="h-32"></div>
		{/if}
	{/if}
</div>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
