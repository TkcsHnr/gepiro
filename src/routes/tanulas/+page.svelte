<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	import { onKeyDown, onKeyUp } from '$lib/scripts/keyboardListener';

	import { keyboard } from '$lib/stores/settings';
	import Results from '$lib/components/Results.svelte';
	import { appState, typedText, text, resetStores } from '$lib/stores/stores';
	import { onMount } from 'svelte';
	import { generateWords } from '$lib/scripts/wordGenerator';
	import { focusInput } from '$lib/scripts/focusInput';
	import { assignWraps } from '$lib/scripts/wrapHandler';

	onMount(() => {
		// max 200 wpm-nyi szó
		generateWords(30).then(() => {
			assignWraps();
		});
		resetStores();
		focusInput();
	});

	$: $typedText, checkLength();
	function checkLength() {
		if ($typedText.length == $text.length && $typedText.length > 0) {
			appState.set('results');
		}
	}
</script>

<svelte:head>
	<title>Teszt</title>
</svelte:head>

<div class="h-full flex flex-col items-center justify-center gap-8">
	{#if $appState == 'results'}
		<Results speed={false} />
	{/if}

	{#if $appState != 'results'}
		<TextArea></TextArea>

		{#if $keyboard}
			<Keyboard></Keyboard>
		{:else}
			<div class="h-32"></div>
		{/if}
	{/if}
</div>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
