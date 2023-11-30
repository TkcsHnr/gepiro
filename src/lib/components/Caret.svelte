<script lang="ts">

    import { typedText } from "$lib/stores/stores";
	import { onMount } from "svelte";

    $: $typedText, updateCaret();

    let caret: HTMLDivElement | null;
    function updateCaret() {
        if(!caret) return;
        caret.classList.remove("blink");

        let activeLetter: HTMLSpanElement | null = document.querySelector("#text span.active");
        if(!activeLetter) return;

        caret.style.left = (activeLetter.offsetLeft - 1).toString() +  "px";
        caret.style.top = (activeLetter.offsetTop).toString() +  "px";
        caret.classList.add("blink");
    }

    onMount(() => {
        updateCaret();
    });
</script>

<div bind:this={caret} class="caret blink"></div>

<style>
    .caret {
        height: 1.75rem;
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