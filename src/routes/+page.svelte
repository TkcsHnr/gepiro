<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	import { onKeyDown, onKeyUp } from '$lib/scripts/keyboardListener';

	const text: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt facilis doloribus at atque excepturi repudiandae, illo nam magnam quisquam dignissimos ipsum reiciendis facere quod, et ipsam, eos eius beatae officia id dolorum. Autem tempora, quaerat qui modi non voluptate nostrum architecto neque eaque ipsum, sed, molestiae at error. Sit culpa laudantium asperiores perferendis cupiditate voluptatum excepturi impedit odio, aperiam voluptatibus adipisci, pariatur qui recusandae! Minima, praesentium. Exercitationem iste debitis dicta accusantium maiores incidunt temporibus soluta, mollitia consequuntur tempora, fuga ullam quibusdam voluptatem ducimus fugiat accusamus iusto quod corporis totam tempore in. Delectus laborum perspiciatis at. Suscipit enim est saepe nihil.";
	
</script>
<main class="flex flex-col h-full items-center justify-center gap-8">
	<TextArea {text}></TextArea>

	<Keyboard {text}></Keyboard>
</main>
<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
