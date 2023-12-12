<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	import { onKeyDown, onKeyUp } from '$lib/scripts/keyboardListener';

	import { preferences } from '$lib/stores/stores';
	import Results from '$lib/components/Results.svelte';
	import { appState, typedText, text, resetStores, accuracy } from '$lib/stores/stores';
	import { onMount } from 'svelte';
	import { generateWords } from '$lib/scripts/wordGenerator';
	import { focusInput } from '$lib/scripts/focusInput';
	import { assignWraps } from '$lib/scripts/wrapHandler';
	import { keys } from '$lib/lessons.json';

	onMount(() => {
		// max 200 wpm-nyi szó
		generateWords(5).then(() => {
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

	let modal : HTMLDialogElement;
</script>

<svelte:head>
	<title>Teszt</title>
</svelte:head>

<div class="h-full flex flex-col items-center justify-center gap-8">
	{#if $appState == 'results'}
		<div class="flex flex-col items-center">
			<Results speed={false} />
			<div class="flex gap-4">
				<button class="btn">Újrakezdés</button>
				{#if $accuracy >= 90}
					<button class="btn">Következő</button>
				{/if}
			</div>
		</div>
	{/if}

	{#if $appState != 'results'}
		<!-- You can open the modal using ID.showModal() method -->
		<button class="btn" on:click={() => modal.showModal()}>open modal</button>
		<dialog id="modal" bind:this={modal} class="modal">
			<div class="modal-box p-12 w-5/6 max-w-4xl h-5/6 scrollbar-thin">
				<form method="dialog">
					<button class="opacity-60 hover:opacity-100 transition-opacity text-2xl font-bold aspect-square p-2 absolute right-2 top-2">✕</button>
				</form>
				<h2 class="pb-4 text-xl">Lecke kiválasztása:</h2>
				<form method="dialog" class="grid grid-cols-9 gap-4 overflow-y-auto ">
					{#each keys as key}
						<button><kbd class="kbd kbd-lg aspect-square w-full hover:border-opacity-60 transition-colors">{key}</kbd></button>
					{/each}
				</form>
			</div>
		</dialog>
		<ul class="steps">
			<li class="step step-primary"></li>
			<li class="step step-primary"></li>
			<li class="step"></li>
		</ul>
		<TextArea></TextArea>

		{#if $preferences.showKeyboard}
			<Keyboard></Keyboard>
		{:else}
			<div class="h-32"></div>
		{/if}
	{/if}
</div>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
