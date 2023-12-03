<script lang="ts">
	import { keyboard, duration } from '$lib/stores/settings';

	import ThemeSelector from '$lib/components/ThemeSelector.svelte';
</script>

<div class="settings">
	<div class="divider"></div>
	<div class="row">
		<p>Billentyűzet megjelenítése:</p>
		<input type="checkbox" bind:checked={$keyboard} class="toggle toggle-primary" />
	</div>
	<div class="divider"></div>
	<div class="row">
		<p>Teszt ideje:</p>
		<div class="flex gap-2 grow">
			{#each [15, 30, 60, 90] as time}
				<button
					type="button"
					on:click={() => duration.set(time)}
					class="btn grow text-xl"
					class:btn-primary={$duration == time}
				>
					{time}
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
	}
	div.row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	p {
		font-size: 1.25rem;
	}
</style>
