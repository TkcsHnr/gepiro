<script lang="ts">
	import { typedText } from '$lib/stores/stores';
	import { onMount } from 'svelte';

	$: $typedText, updateCaret();

	let caret: HTMLDivElement | null;
	function updateCaret() {
		if (!caret) return;
		caret.classList.remove('blink');

		let activeLetter: HTMLSpanElement | null = document.querySelector('#text span.active');
		if (activeLetter) {
			caret.style.left = (activeLetter.offsetLeft - 1).toString() + 'px';
			caret.style.top = activeLetter.offsetTop.toString() + 'px';
		} else {
			let letters: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll('#text span');
			if (!letters) return;
			let lastLetter: HTMLSpanElement = letters[letters.length - 1];

			caret.style.left = (lastLetter.offsetLeft + lastLetter.offsetWidth - 1).toString() + 'px';
			caret.style.top = lastLetter.offsetTop.toString() + 'px';
		}

		caret.classList.add('blink');
	}

	onMount(() => {
		updateCaret();
	});
</script>

<div bind:this={caret} class="caret blink"> </div>

<style>
	.caret {
		height: 1.8rem;
		border: 1px solid oklch(var(--p));
		position: absolute;
		z-index: 20;
	}

	.blink {
		animation: caret-blink 1s infinite;
		animation-timing-function: step-end;
	}

	@keyframes caret-blink {
		50% {
			border-color: transparent;
		}
	}
</style>
