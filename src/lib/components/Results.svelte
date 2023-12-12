<script lang="ts">
	import { typedText, text, appState, correct, incorrect, accuracy } from '$lib/stores/stores';
	import { preferences } from '$lib/stores/stores';

	$: cpm = 0;
	$: wpm = 0;
	$: correctChars = 0;
	$: incorrectChars = 0;
	$: $appState, calculate();

	export let speed: boolean = true;

	function calculate() {
		if ($appState != 'results') return;

		if (speed) {
			cpm = ($typedText.length / $preferences.testDuration) * 60;
			wpm = cpm / 5;
		}

		correctChars = 0;
		incorrectChars = 0;
		for (let i = 0; i < $typedText.length; i++) {
			if ($text[i] == $typedText[i]) correctChars++;
			else incorrectChars++;
		}
		if ($correct == 0) accuracy.set(0);
		else accuracy.set(($correct / ($correct + $incorrect)) * 100);
	}
</script>

<div class="flex gap-4 pb-8 flex-wrap justify-center">
	{#if speed}
		<div class="stats shadow">
			<div class="stat" title="leírt szavak/perc">
				<div class="stat-title">wpm</div>
				<div class="stat-value">{wpm.toFixed(0)}</div>
			</div>
			<div class="stat" title="leírt karakterek/perc">
				<div class="stat-title">cpm</div>
				<div class="stat-value">{cpm.toFixed(0)}</div>
			</div>
		</div>
	{/if}

	<div class="stats shadow">
		<div class="stat">
			<div class="stat-title">pontosság</div>
			<div class="stat-value">{$accuracy.toFixed(0)}%</div>
		</div>
		<div class="stat" title="helyesen leírt karakterek">
			<div class="stat-title">helyes</div>
			<div class="stat-value">{correctChars}</div>
		</div>
		<div class="stat" title="helytelenül leírt karakterek">
			<div class="stat-title">helytelen</div>
			<div class="stat-value">{incorrectChars}</div>
		</div>
	</div>
</div>

<style lang="scss">
	.stat-title {
		font-size: 1.5rem;
		color: oklch(var(--p));
	}
	.stats {
		background-color: oklch(var(--b2));
		border: 1px solid oklch(var(--b3));
	}
</style>
