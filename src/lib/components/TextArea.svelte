<script lang="ts">
	import {
		text,
		typedText,
		prevTypedText,
		inputFocused,
		appState,
		incorrect,
		correct
	} from '$lib/stores/stores';
	import { assignWraps, wrapIndexes } from '$lib/scripts/wrapHandler';
	import { onMount } from 'svelte';
	import Caret from './Caret.svelte';
	import FocusWarning from './FocusWarning.svelte';
	import { focusInput } from '$lib/scripts/focusInput';
	import { generateWords } from '$lib/scripts/wordGenerator';

	const textLineHeight = 2.5;

	let p: HTMLParagraphElement | null;
	$: wrapCount = $wrapIndexes.filter((i) => i <= $typedText.length).length;
	$: wrapCount, shift();
	function shift() {
		let translate = 'translateY(' + (wrapCount * -textLineHeight).toString() + 'rem)';
		if (p) p.style.transform = translate;
	}

	onMount(() => {
		// max 200 wpm-nyi szó
		generateWords().then(() => {
			assignWraps();
			focusInput();
		});
	});

	$: $typedText, onType();
	function onType() {
		if ($appState == 'default' && $typedText.length > 0) appState.set('running');

		if ($prevTypedText && $typedText.length > $prevTypedText.length) {
			if ($typedText[$typedText.length - 1] == $text[$typedText.length - 1])
				correct.update((value) => value + 1);
			else incorrect.update((value) => value + 1);
		}
	}

	function focusin() {
		inputFocused.set(true);
	}
	function focusout() {
		inputFocused.set(false);
	}
</script>

<div class="text-container">
	<p bind:this={p} id="text" class="transition-all duration-100" class:hide={!$inputFocused}>
		{#each $text as char, i}
			<span
				class:active={i == $typedText.length}
				class:correct={$typedText.length > i && $typedText[i] == $text[i]}
				class:incorrect={$typedText.length > i && $typedText[i] != $text[i]}
				class:space={char == ' '}
			>
				{char}</span
			>
		{/each}
		{#if $inputFocused}
			<Caret />
		{/if}
	</p>
	<FocusWarning />
	<textarea bind:value={$typedText} on:focusout={focusout} on:focusin={focusin} id="textInput" />
</div>
<svelte:window on:resize={assignWraps} />

<style lang="scss">
	.text-container {
		width: 100%;
		overflow-y: hidden;
		height: 7.5rem;
		padding: 1px;

		display: flex;
		align-items: flex-start;
		position: relative;
	}

	#textInput {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 15;
		opacity: 0;
		cursor: default;
	}

	#text {
		font-size: 1.75rem;
		line-height: 2.5rem;
		padding: 0 0.5rem;
		color: oklch(var(--bc));
		position: relative;

		&.hide {
			opacity: 50%;
			filter: blur(4px);
		}
	}

	#text span {
		opacity: 40%;
		&.correct {
			opacity: 100% !important;
		}
		&.incorrect {
			opacity: 100% !important;
			color: oklch(var(--er));
			&.space {
				text-decoration: underline;
				text-decoration-thickness: 2px;
			}
		}
	}
</style>
