<script lang="ts">
	export let text: string;

	import { typedText } from '$lib/stores/stores';
</script>

<div class="max-w-6xl overflow-hidden h-40 p-6 flex items-start relative">
	<div class="w-full h-6 absolute top-0 left-0 bg-base-100 z-10"></div>
	<p id="text" class="leading-10 ">
		{#each text as char, i}
			<span
				class="font-mono text-2xl text-neutral-content opacity-50 relative border-l-2 border-transparent"
				class:active={i == $typedText.length}
                class:opacity-100={$typedText.length > i}
                class:wrong={$typedText.length > i && $typedText[i] != text[i]}
			>
				{char}</span
			>
		{/each}
	</p>
	<div class="w-full h-6 absolute bottom-0 left-0 bg-base-100 z-10"></div>
</div>

<style>
    p#text span.active {
        border-color: oklch(var(--p));
        animation: blink 1s infinite;
        animation-timing-function: step-end;
    }

    .wrong {
        color: oklch(var(--er));
    }

    @keyframes blink {
        50% {
            border-color: transparent;
        }
    }
</style>