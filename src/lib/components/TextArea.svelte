<script lang="ts">
	import { text, typedText, wrapIndexes, inputFocused } from '$lib/stores/stores';
	import { assignWraps } from '$lib/scripts/wrapHandler';
	import { onMount } from 'svelte';
	import Caret from './Caret.svelte';
	import { focusInput } from '$lib/scripts/focusInput';
	import { generateWords } from '$lib/scripts/wordGenerator';

	const leading = 2.5;
	
	let p: HTMLParagraphElement | null;
	$: wrapCount = $wrapIndexes.filter((i) => i <= $typedText.length).length;
	$: wrapCount, shift();
	function shift() {
		let translate = 'translateY(' + (wrapCount * -leading).toString() + 'rem)';
		if (p) p.style.transform = translate;
	}

	onMount(() => {
		generateWords(50).then(() => {
			assignWraps();
			focusInput();
		})
	});

	function focusin() {
		inputFocused.set(true);
	}
	function focusout() {
		inputFocused.set(false);
	}
</script>

<div class="text-container transition-[filter]" class:blur-sm={!$inputFocused}>
	<p bind:this={p} id="text" class="transition-transform duration-100">
		{#each $text as char, i}
			<span
				class:active={i == $typedText.length}
				class:correct={$typedText.length > i && $typedText[i] == $text[i]}
				class:wrong={$typedText.length > i && $typedText[i] != $text[i]}
				class:space={$text[i] == ' '}
			>
				{char}</span
			>
		{/each}
		{#if $inputFocused}
			<Caret />
		{/if}
	</p>
	<textarea bind:value={$typedText} on:focusout={focusout} on:focusin={focusin} id="textInput" />
</div>
<svelte:window on:resize={assignWraps} />

<style lang="scss">
	.text-container {
		max-width: 65rem;
		width: 100%;
		overflow: hidden;
		height: 7.5rem;

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
	}

	#text {
		font-family: monospace;
		font-size: 1.5rem;
		line-height: 2.5rem;
		color: oklch(var(--bc));
		position: relative;
	}

	#text span {
		opacity: 40%;
		&.correct {
			opacity: 100% !important;
		}
		&.wrong {
			opacity: 100% !important;
			color: oklch(var(--er));
			&.space {
				text-decoration: underline;
				text-decoration-thickness: 2px;
			}
		}
	}
</style>
