<script>
	import { themes } from '$lib/themes.json';
    import { onMount } from 'svelte';
    import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<div class="flex w-full flex-wrap gap-2">
	{#each themes as theme}
        <button data-set-theme="{theme}" class="btn btn-lg font-mono flex flex-col border-base-300" data-theme={theme}>
            {theme}
            <p>
                <span class="badge badge-primary">A</span>
                <span class="badge badge-secondary">A</span>
                <span class="badge badge-accent">A</span>
            </p>
        </button>
	{/each}
</div>
