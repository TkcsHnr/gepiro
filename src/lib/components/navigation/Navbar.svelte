<script lang="ts">
	import { appState, inputFocused } from '$lib/stores/stores';
	import { resetStores } from '$lib/stores/stores';
	import { focusInput } from '$lib/scripts/focusInput';
	import { generateWords } from '$lib/scripts/wordGenerator';
	import { assignWraps } from '$lib/scripts/wrapHandler';
	import LearnSvg from '../svg/LearnSvg.svelte';
	import KeyboardSvg from '../svg/KeyboardSvg.svelte';
	import SettingsSvg from '../svg/SettingsSvg.svelte';

	function startNew() {
		generateWords().then(() => {
			assignWraps();
		});
		resetStores();
		focusInput();
		// NEM FOKUSZALODIK AZ INPUT
	}
</script>

<div class="nav transition-opacity" class:hide={$appState == 'running' && $inputFocused}>
	<div class="flex-1">
		<a href="/" class="logo">
			gepiro<span>.hu</span>
		</a>
	</div>
	<a
		on:click={resetStores}
		href="/tanulas"
		class="opacity-60 hover:opacity-100 transition-opacity"
	>
		<span class="hidden sm:inline-block">Tanulás</span>
		<span title="Tanulás">
			<LearnSvg />
		</span>
	</a>
	<a
		on:click={startNew}
		href="/teszt"
		class="opacity-60 hover:opacity-100 transition-opacity"
	>
		<span class="hidden sm:inline-block">Teszt</span>
		<span title="Teszt">
			<KeyboardSvg />
		</span>
	</a>
	<a
		on:click={resetStores}
		href="/beallitasok"
		class="opacity-60 hover:opacity-100 transition-opacity"
	>
		<span class="hidden sm:inline-block">Beállítások</span>
		<span title="Beállítások">
			<SettingsSvg />
		</span>
	</a>
</div>

<style lang="scss">
	.logo {
		font-size: 1.5rem;
		line-height: 1.5rem;
		font-weight: bold;
		color: oklch(var(--p));

		span {
			color: oklch(var(--bc));
		}
	}
	.nav {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 2rem 4px; //4px blur size

		transition-duration: 300ms;
		&.hide {
			opacity: 0;
		}
	}
	.nav > a {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		font-size: 1.125rem;
	}
</style>
