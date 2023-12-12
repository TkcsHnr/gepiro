<script>
	import { preferences } from '$lib/stores/stores';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});

	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter',
		'dim',
		'nord',
		'sunset'
	];
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
	{#each themes as theme}
		<button data-set-theme={theme} on:click={() => $preferences.theme = theme} class="btn btn-lg font-mono transition-all">
			<div class="inside" data-theme={theme}>
				<p>{theme}</p>
				<p class="flex gap-1">
					<span class="badge badge-primary">A</span>
					<span class="badge badge-secondary">A</span>
					<span class="badge badge-accent">A</span>
					<span class="badge badge-neutral">A</span>
				</p>
			</div>
		</button>
	{/each}
</div>

<style lang="scss">
	.grid {
		width: 100%;
		gap: 1rem;
	}
	.btn {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		border-color: oklch(var(--b3));
		position: relative;
		overflow: hidden;
		padding: 0;

		.inside {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
			padding: 0 1.5rem;
		}
	}

	span.badge {
		border-radius: 3px;
		aspect-ratio: 1;
	}
</style>
