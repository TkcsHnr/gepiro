<script lang="ts">
	import { typedText, text, appState } from '$lib/stores/stores';
	import { duration } from '$lib/stores/settings';
	import RestartButton from './RestartButton.svelte';

	$: cpm = 0;
	$: wpm = 0;
	$: correct = 0;
	$: incorrect = 0;
	$: accuracy = 0;

	$: $appState, calculate();

	function calculate() {
		if ($appState != 'results') return;

		cpm = ($typedText.length / $duration) * 60;
		wpm = cpm / 5;

		correct = 0;
		incorrect = 0;

		for (let i = 0; i < $typedText.length; i++) {
			if ($text[i] == $typedText[i]) correct++;
			else incorrect++;
		}

		accuracy = (correct / $typedText.length) * 100;
	}
</script>

<h1>Eredmény:</h1>

<div class="flex gap-4 p-8">
	<div class="stats shadow">
		<div class="stat" >
			<div class="stat-title">wpm</div>
			<div class="stat-value">{wpm.toFixed(0)}</div>
		</div>
		<div class="stat">
			<div class="stat-title">cpm</div>
			<div class="stat-value">{cpm.toFixed(0)}</div>
		</div>
	</div>

	<div class="stats shadow">
		<div class="stat">
			<div class="stat-title">pontosság</div>
			<div class="stat-value">{accuracy.toFixed(0)}%</div>
		</div>
		<div class="stat">
			<div class="stat-title">helyes</div>
			<div class="stat-value" title="helyes karakterleütések száma">{correct}</div>
		</div>
		<div class="stat">
			<div class="stat-title">helytelen</div>
			<div class="stat-value" title="helytelen karakterleütések száma">{incorrect}</div>
		</div>
	</div>
</div>

<style lang="scss">
	h1 {
		font-size: 2.25rem;
		line-height: 2.25rem;
	}
	.stat-title {
		font-size: 1.5rem;
		color: oklch(var(--p));
	}
	.stats {
		background-color: oklch(var(--b2));
		border: 1px solid oklch(var(--b3));
	}
</style>
