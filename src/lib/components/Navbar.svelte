<script lang="ts">
	import { appState } from '$lib/stores/stores';
	import SettingsButton from './SettingsButton.svelte'
</script>

<div class="navbar transition-opacity" class:hide={$appState == 'running'}>
	<div class="flex-1">
		<a href="/" class="text-2xl font-bold text-primary">
			gepiro.hu
		</a>
	</div>
	<div class="flex-none">
		<SettingsButton />
	</div>
</div>

<style lang="scss">
	.navbar {
		padding: 1.5rem 0 !important;
		position: absolute;
		left: 0;
		top: 0;
		&.hide {
			opacity: 0;
		}
	}
</style>
