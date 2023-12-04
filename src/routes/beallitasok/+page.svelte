<script lang="ts">
	import { keyboard, duration, keyboardSize } from '$lib/stores/settings';

	import ThemeSelector from '../../lib/components/ThemeSelector.svelte';

	const sizes = ['md', 'lg'];
	const sizeLabels = ['Kicsi', 'Nagy'];
</script>

<svelte:head>
	<title>Beállítások</title>
</svelte:head>

<div class="settings">
	<div class="divider"></div>
	<div class="row">
		<p>Teszt ideje (másodperc):</p>
		<div class="buttons">
			{#each [15, 30, 60, 90] as time}
				<button
					type="button"
					on:click={() => duration.set(time)}
					class="btn grow text-lg"
					class:btn-primary={$duration == time}
				>
					{time}
				</button>
			{/each}
		</div>
	</div>
	<div class="divider"></div>
	<div class="row">
		<p>Billentyűzet megjelenítése:</p>
		<input type="checkbox" bind:checked={$keyboard} class="toggle toggle-primary" />
	</div>
	<div class="divider"></div>
	<div class="row">
		<p class:opacity-20={!$keyboard}>Billentyűzet mérete:</p>
		<div class="buttons">
			{#each sizes as size, i}
				<button
					type="button"
					on:click={() => keyboardSize.set(size)}
					class="btn grow text-lg"
					class:btn-primary={$keyboardSize == size}
					class:btn-disabled={!$keyboard}
				>
					{sizeLabels[i]}
				</button>
			{/each}
		</div>
	</div>
	<div class="divider"></div>
	<div class="flex flex-col gap-4">
		<p>Válassz témát:</p>
		<ThemeSelector />
	</div>
</div>

<style lang="scss">
	div.settings {
		display: flex;
		flex-direction: column;
		max-width: 60rem;
		width: 100%;
	}
	div.row {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;

		p {
			font-size: 1.125rem;
		}
	}
	div.buttons {
		display: flex;
		gap: 1rem;
		flex-grow: 1;
	}
</style>
