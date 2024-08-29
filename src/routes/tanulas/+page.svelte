<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	import { onKeyDown, onKeyUp } from '$lib/scripts/keyboardListener';

	import { preferences } from '$lib/stores/stores';
	import Results from '$lib/components/Results.svelte';
	import {
		appState,
		typedText,
		text,
		resetStores,
		accuracy,
		current_key_i
	} from '$lib/stores/stores';
	import { onMount } from 'svelte';
	import { generateLesson } from '$lib/scripts/wordGenerator';
	import { focusInput } from '$lib/scripts/focusInput';
	import { assignWraps } from '$lib/scripts/wrapHandler';
	import { keys } from '$lib/learn.json';
	import RestartButton from '$lib/components/RestartButton.svelte';
	import CloseSvg from '$lib/components/svg/CloseSvg.svelte';

	onMount(() => {
		// max 200 wpm-nyi szó
		initialize();
	});

	async function initialize() {
		generateLesson(keys[$current_key_i]).then(() => {
			assignWraps();
			focusInput();
		});
		resetStores();
		appState.set('default');
	}

	$: $typedText, checkLength();
	function checkLength() {
		if ($typedText.length == $text.length && $typedText.length > 0) {
			appState.set('results');
		}
	}

	let modal: HTMLDialogElement;

	function restart() {
		initialize();
	}

	function next() {
		if ($current_key_i >= keys.length) return;

		$current_key_i = $current_key_i + 1;
		initialize();
	}
</script>

<svelte:head>
	<title>Teszt</title>
</svelte:head>

<div class="h-full flex flex-col items-center justify-center gap-8">
	<div class="flex gap-4">
		<button
			class="btn btn-square text-xl border-base-content border-opacity-20"
			on:click={() => modal.showModal()}
		>
			{keys[$current_key_i]}</button
		>
		{#if $appState != 'results'}
			<RestartButton restart={initialize} />
		{/if}
	</div>

	{#if $appState == 'results'}
		<div class="flex flex-col items-center">
			{#if $accuracy < 90}
				<p class="text-lg text-error mb-4">Érj el legalább 90%-os pontosságot!</p>
			{/if}
			<Results speed={false} />
			<div class="flex gap-4">
				<button class="btn btn-lg text-xl btn-error" on:click={restart}>Újrakezdés</button>
				{#if $accuracy >= 90}
					<button class="btn btn-lg text-xl btn-success" on:click={next}>Következő</button>
				{/if}
			</div>
		</div>
	{/if}

	{#if $appState != 'results'}
		<dialog id="modal" bind:this={modal} class="modal">
			<div class="modal-box p-12 w-5/6 max-w-4xl h-5/6 scrollbar-thin">
				<form method="dialog">
					<button
						class="opacity-60 hover:opacity-100 transition-opacity text-2xl font-bold aspect-square p-2 absolute right-2 top-2"
					>
						<CloseSvg />
					</button>
				</form>
				<h2 class="pb-4 text-xl">Lecke kiválasztása:</h2>
				<form method="dialog" class="grid grid-cols-9 gap-4 overflow-y-auto">
					{#each keys as key, i}
						<button
							on:click={() => {
								$current_key_i = i;
								initialize();
							}}
						>
							<kbd
								class="kbd kbd-lg transition-colors"
								class:current={i <= $current_key_i}
								class:remaining={i > $current_key_i}
							>
								{key}
							</kbd>
						</button>
					{/each}
				</form>
			</div>
		</dialog>
		<TextArea></TextArea>

		{#if $preferences.showKeyboard}
			<Keyboard></Keyboard>
		{:else}
			<div class="h-32"></div>
		{/if}
	{/if}
</div>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<style lang="scss">
	.kbd {
		aspect-ratio: 1;
		width: 100%;
		font-size: 1.5rem;

		--tw-border-opacity: 0.6;
		&:hover,
		&.current {
			--tw-border-opacity: 1;
			border-width: 2px;
			border-bottom-width: 4px;
		}

		&.current {
			color: oklch(var(--p));
			border-color: oklch(var(--p));
		}
	}
</style>
