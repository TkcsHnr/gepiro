<script>
	import { inputFocused } from '$lib/stores/stores';
</script>

<p class="focus-warning transition-opacity duration-100 sm:text-xl" class:opacity-0={$inputFocused}>
	<svg xmlns="http://www.w3.org/2000/svg" class="w-2 sm:w-3 fill-current" viewBox="0 0 320 512"
		><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
			d="M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z"
		/></svg
	>
	Kattints, vagy kezdj gépelni!
</p>

<style>
	p.focus-warning {
        display: flex;
        align-items: center;
        gap: .5rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: oklch(var(--bc));
		white-space: nowrap;
	}
</style>
