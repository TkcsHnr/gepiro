<script lang="ts">
	import { keyboardState, caps, typedText, pressTheseKeys } from '$lib/stores/stores';
	import { rows } from '$lib/keys.json';

	export let text: string;

	// indexoutofbound handle in future
	$: nextLetter = text[$typedText.length];

	$: nextLetter, updateKeys();
	function updateKeys() {
		if (nextLetter == ' ') {
			nextLetter = 'Space';
		}
		rows.forEach((row) => {
			row.forEach((key) => {
				if (key.default == nextLetter) pressTheseKeys.set([key.code]);
				else if (key.shift == nextLetter) pressTheseKeys.set([key.code, 'ShiftLeft']);
				else if (key.altgr == nextLetter) pressTheseKeys.set([key.code, 'AltRight']);
			});
		});
	}
</script>

<div class="keyboard">
	{#each rows as row}
		<div class="row">
			{#each row as key}
				<kbd
					class="kbd transition-colors"
					class:grow={key.grow}
					class:caps={key.code == 'CapsLock' && $caps}
					class:press={$pressTheseKeys.includes(key.code)}
				>
					{key[$keyboardState]}
				</kbd>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.keyboard {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.5rem;
		width: fit-content;
		background-color: oklch(var(--b2));
		border-radius: 1rem;

		.row {
			display: flex;
			width: 100%;
			gap: 0.5rem;
		}
	}
	kbd {
		transition-duration: 50ms;
		&.press {
			background-color: oklch(var(--p));
			color: oklch(var(--pc));
		}
		&.caps {
			border-color: oklch(var(--p));
		}
	}
</style>
