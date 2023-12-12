<script lang="ts">
	import { preferences } from '$lib/stores/stores';

	import ThemeSelector from '$lib/components/ThemeSelector.svelte';
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
					on:click={() => ($preferences.testDuration = time)}
					class="btn grow text-lg"
					class:btn-primary={$preferences.testDuration == time}
				>
					{time}
				</button>
			{/each}
		</div>
	</div>
	<div class="divider"></div>
	<div class="row">
		<p>Billentyűzet megjelenítése:</p>
		<input type="checkbox" bind:checked={$preferences.showKeyboard} class="toggle toggle-primary" />
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
	}
	p {
		font-size: 1.125rem;
	}
	div.buttons {
		display: flex;
		gap: 1rem;
		flex-grow: 1;
	}
</style>
