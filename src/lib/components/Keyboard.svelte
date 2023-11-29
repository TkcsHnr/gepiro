<script lang="ts">
	import { keyboardState, pressedKeys } from '$lib/stores/stores';
	import { rows } from '$lib/keys.json';
</script>

<div class="flex flex-col gap-2 p-8 m-auto w-fit bg-base-200 rounded-2xl">
	{#each rows as row}
		<div class="flex w-full gap-2">
			{#each row as key}
				<kbd class="kbd kbd-lg" 
                     class:grow={key['grow']}
                     class:bg-primary={$pressedKeys.includes(key['code'])}>
                    {key[$keyboardState]}
                </kbd>
			{/each}
		</div>
	{/each}
</div>
