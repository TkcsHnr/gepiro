<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	import { onKeyDown, onKeyUp } from '$lib/keyboardListener';

	const text: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non fugit similique voluptate praesentium reprehenderit consequatur, qui at culpa voluptatem sapiente ut quae ipsa molestias tenetur atque nulla labore numquam sunt ea rerum excepturi dolorum. Facilis, eum nam. Deserunt magnam sit maxime totam facere ex nostrum perspiciatis itaque accusamus nemo incidunt consequuntur, necessitatibus vitae laudantium reiciendis architecto molestias officia nam, nisi, reprehenderit veritatis praesentium sunt! Animi hic velit iusto veritatis, nihil omnis suscipit consequuntur ullam, sed, quam molestiae fugiat quae vel eaque rem facilis excepturi optio repudiandae! Magni voluptatum explicabo obcaecati aut similique eius laborum sapiente ipsa, suscipit quod neque possimus commodi sed magnam harum porro vel quaerat perspiciatis, nemo excepturi maiores. Ducimus dolorem, porro repellat iste omnis libero quia at, perferendis inventore in quas nihil et accusamus delectus? Ipsam aut quae, doloribus voluptatum ullam id consectetur alias iusto exercitationem. Quos neque placeat, cupiditate cumque totam similique voluptatum nisi ad praesentium, ducimus odio nobis aut accusamus exercitationem corrupti earum saepe a hic! Alias itaque, aliquam nam eos repellendus tenetur quas hic sapiente assumenda perferendis dolorum, a ut aut facere provident iusto eveniet autem ducimus dolorem soluta accusantium architecto totam suscipit nisi. Officia magni aperiam adipisci et rem fuga. Ipsa, ullam minima!"
</script>

<main class="flex flex-col h-full items-center justify-center gap-8">
	<TextArea {text}></TextArea>

	<Keyboard></Keyboard>
</main>
<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
