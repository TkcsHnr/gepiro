<script lang="ts">
	import { keyboardState, pressedKeys, caps } from '$lib/stores/stores';
	import { rows } from '$lib/keys.json';
</script>

<div class="flex flex-col gap-2 p-6 w-fit bg-base-200 rounded-2xl">
	{#each rows as row}
		<div class="flex w-full gap-2">
			{#each row as key}
				<kbd class="kbd" 
                     class:grow={key['grow']}
                     class:active={$pressedKeys.includes(key['code'])}
                     class:border-primary={key.code == "CapsLock" && $caps}>
                    
                    {key[$keyboardState]}
                </kbd>
			{/each}
		</div>
	{/each}
</div>

<style>
    kbd.active {
        background-color: oklch(var(--p));
        color: oklch(var(--pc));
    }
</style>