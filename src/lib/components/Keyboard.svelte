<script lang="ts">
	import { text, typedText } from '$lib/stores/stores';
	import { keyboardState, caps, pressedKeys } from '$lib/scripts/keyboardListener';
	import { rows } from '$lib/keys.json';
	import { onMount } from 'svelte';

	$: correct = $typedText[$typedText.length - 1] == $text[$typedText.length - 1];

	function emptyStringArray(): string[] {
		return [];
	}
	$: pressTheseKeys = emptyStringArray();

	$: $typedText || $text, updateKeys();
	function updateKeys() {
		let nextLetter: string = $text[$typedText.length]?.replace(' ', 'Space');
		if (!nextLetter) return;
		rows.forEach((row) => {
			row.forEach((key) => {
				if (key.default == nextLetter) pressTheseKeys = [key.code];
				else if (key.shift == nextLetter) pressTheseKeys = [key.code, 'ShiftLeft'];
				else if (key.altgr == nextLetter) pressTheseKeys = [key.code, 'AltRight'];
			});
		});
	}
	onMount(() => updateKeys());
</script>

<div class="keyboard">
	{#each rows as row}
		<div class="row">
			{#each row as key}
				<kbd
					class="kbd kbd-lg transition-colors {key.code}"
					class:grow={key.grow}
					class:caps={key.code == 'CapsLock' && $caps}
					class:press={pressTheseKeys.includes(key.code)}
					class:correct={$pressedKeys.includes(key.code) && correct}
					class:incorrect={$pressedKeys.includes(key.code) && !correct}
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
		gap: 4px; //0.25rem

		.row {
			display: flex;
			width: 100%;
			gap: 0.25rem;
		}
	}
	kbd {
		transition-duration: 100ms;
		&.press {
			background-color: oklch(var(--p));
			color: oklch(var(--pc));
		}
		&.caps {
			background-color: oklch(var(--wa) / 0.1);
			border-color: oklch(var(--wa));
			color: oklch(var(--wa));
		}
		&.correct {
			background-color: oklch(var(--su) / 0.1);
			border-color: oklch(var(--su));
			color: oklch(var(--su));
		}
		&.incorrect {
			background-color: oklch(var(--er) / 0.1);
			border-color: oklch(var(--er));
			color: oklch(var(--er));
		}

		&.Tab,
		&.CapsLock,
		&.ShiftLeft,
		&.Enter,
		&.AltRight {
			height: 100%;
		}

		&.ControlLeft,
		&.ControlRight,
		&.AltRight,
		&.AltLeft,
		&.Fn,
		&.MetaLeft {
			font-size: 0.75rem;
		}

		&.AltRight {
			aspect-ratio: 1.2;
			padding: 0;
		}
		&.Tab {
			aspect-ratio: 1.4;
		}
		&.CapsLock {
			aspect-ratio: 1.8;
		}
		&.ShiftLeft {
			aspect-ratio: 1.3;
		}
	}
</style>
