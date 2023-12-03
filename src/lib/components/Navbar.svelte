<script lang="ts">
	import { appState, inputFocused } from '$lib/stores/stores';
	import NewTestButton from './NewTestButton.svelte';
	import SettingsButton from './SettingsButton.svelte';
</script>

<div class="nav transition-opacity" class:hide={$appState == 'running' && $inputFocused}>
	<div class="flex-1">
		<a href="/" class="logo">
			gepiro.hu
		</a>
	</div>
	<div class="flex-none">
		<NewTestButton />
	</div>
	<div class="flex-none">
		<SettingsButton />
	</div>
</div>

<style lang="scss">
	.logo {
		font-size: 1.5rem;
		line-height: 1.5rem;
		font-weight: bold;
		color: oklch(var(--p));
	}
	.nav {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 2rem 0 !important;
		&.hide {
			opacity: 0;
		}
	}
</style>
