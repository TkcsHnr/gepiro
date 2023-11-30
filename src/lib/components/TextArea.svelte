<script lang="ts">
	export let text: string;

	import { typedText, wrapIndexes, inputFocused } from '$lib/stores/stores';
	import { assignWraps } from '$lib/scripts/wrapHandler';
	import { onMount } from 'svelte';
	import Caret from './Caret.svelte';

	const leading = 2.5;

	$: wrapCount = $wrapIndexes.filter((i) => i <= $typedText.length).length;
	onMount(() => assignWraps());

	let p: HTMLParagraphElement | null;
	$: wrapCount, shift();
	function shift() {
		let translate = 'translateY(' + (wrapCount * -leading).toString() + 'rem)';
		if (p) p.style.transform = translate;
	}

	let input: string = '';
	$: input, typedText.set(input);

	function focusin() {
		inputFocused.set(true);
	}
	function focusout() {
		inputFocused.set(false);
	}
</script>

<div class="text-container" class:blur-sm={!$inputFocused}>
	<p bind:this={p} id="text" class="transition-transform">
		{#each text as char, i}
			<span
				class:active={i == $typedText.length}
				class:correct={$typedText.length > i && $typedText[i] == text[i]}
				class:wrong={$typedText.length > i && $typedText[i] != text[i]}
				class:space={text[i] == ' '}
			>
				{char}</span
			>
		{/each}
		{#if $inputFocused}
			<Caret />
		{/if}
	</p>
	<textarea bind:value={input} on:focusout={focusout} on:focusin={focusin} id="textInput" />
</div>
<svelte:window on:resize={assignWraps} />

<style lang="scss">
	.text-container {
		max-width: 70rem;
		width: 100%;
		overflow: hidden;
		height: 7.5rem;

		display: flex;
		align-items: start;
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
