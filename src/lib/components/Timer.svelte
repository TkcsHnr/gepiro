<script lang="ts">
    import { appState } from "$lib/stores/stores";
    import { preferences } from "$lib/stores/stores";
    import { get } from "svelte/store";

    let timer: number;
    $: time = get(preferences).testDuration;

    $: $appState, handleState();
    function handleState() {
        switch($appState) {
            case "running":
                start();
                break;
            case "default":
                reset();
                break;
        }
    }

    function start() {
        timer = setInterval(() => {
            time--;
            if(time == 0) end();
        }, 1000);
    }

    function end() {
        appState.set("results");
        stop();
    }

    function stop() {
        clearInterval(timer);
    }   

    function reset() {
        stop();
        time = $preferences.testDuration;
    }
</script>

<div class="timer transition-opacity"
     class:show={$appState == "running"}>
    {time}
</div>

<style lang="scss">
    .timer {
        display: flex;
        font-size: 1.5rem;
        padding: 0 4px; //blur size
        color: oklch(var(--p));
        height: 2rem;
        width: 100%;
        opacity: 0;

        &.show {
            opacity: 100% !important;
        }
    }
</style>