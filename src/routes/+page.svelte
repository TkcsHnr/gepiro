<script lang="ts">
    import Keyboard from "$lib/components/Keyboard.svelte";

    import { onKeyDown, onKeyUp } from "$lib/keyboardListener"
	import { keyboardState, pressedKeys } from "$lib/stores/stores";
</script>

<Keyboard></Keyboard>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp} />


{$keyboardState}