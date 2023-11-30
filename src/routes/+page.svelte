<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	import { onKeyDown, onKeyUp } from '$lib/scripts/keyboardListener';

	import { keyboard } from '$lib/stores/options';
	import RestartButton from '$lib/components/RestartButton.svelte';
</script>

<div class="flex flex-col h-full items-center justify-center gap-8">
	<TextArea></TextArea>

	<RestartButton />

	{#if $keyboard}
		<Keyboard></Keyboard>
	{/if}
</div>
<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
