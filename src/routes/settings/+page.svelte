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
		<div class="grow">
			<div class="w-full flex justify-between">
				<span>15s</span>
				<span>30s</span>
				<span>45s</span>
				<span>60s</span>
			</div>
			<input
				type="range"
				bind:value={$duration}
				min="15"
				max="60"
				step="15"
				class="range range-primary"
			/>
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
