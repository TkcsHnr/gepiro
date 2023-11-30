<script lang="ts">
	export let text: string;

	import { typedText, wrapIndexes } from '$lib/stores/stores';
	import { assignWraps } from '$lib/scripts/wrapHandler';
	import { onMount } from 'svelte';
	import Caret from './Caret.svelte';

	const leading = 2;

	$: wrapCount = $wrapIndexes.filter((i) => i <= $typedText.length).length;
	onMount(() => {
		assignWraps();
	});

	let p: HTMLParagraphElement | null;
	$: wrapCount, shift();
	function shift() {
		let translate = 'translateY(' + (wrapCount * -leading).toString() + 'rem)';
		if (p) p.style.transform = translate;
	}
</script>

<div class="text-container">
	<div class="cover top"></div>
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
		<Caret />
	</p>
	<div class="cover bottom"></div>
</div>

<style lang="scss">
	.text-container {
		max-width: 75rem;
		width: 100%;
		overflow: hidden;
		height: 9rem;
		padding: 1.5rem;

		display: flex;
		align-items: start;
		position: relative;
	}

	.cover {
		width: 100%;
		height: 1.5rem;
		position: absolute;
		left: 0;
		background-color: oklch(var(--b1));
		z-index: 10;

		&.top {
			top: 0;
		}
		&.bottom {
			bottom: 0;
		}
	}

	#text {
		font-family: monospace;
		font-size: 1.5rem;
		line-height: 2rem;
		color: oklch(var(--nc));
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
