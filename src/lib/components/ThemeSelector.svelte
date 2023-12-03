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

<div id="grid">
	{#each themes as theme}
        <button data-set-theme="{theme}" class="btn btn-lg font-mono" data-theme={theme}>
            {theme}
            <p>
                <span class="badge badge-primary">A</span>
                <span class="badge badge-secondary">A</span>
                <span class="badge badge-accent">A</span>
            </p>
        </button>
	{/each}
</div>

<style lang="scss">
    #grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
    .btn {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        border-color: oklch(var(--b3));
    }
</style>