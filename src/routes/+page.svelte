<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	import { onKeyDown, onKeyUp } from '$lib/keyboardListener';
	import { typedText } from '$lib/stores/stores';

	const text: string =
		'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid ipsum 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789';
</script>

<main class="flex flex-col h-full items-center justify-center gap-8">
	<TextArea {text}></TextArea>

	<Keyboard></Keyboard>
</main>
<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp} />
