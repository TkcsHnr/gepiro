import { writable, type Writable } from "svelte/store";
import { withPrevious } from 'svelte-previous';
import type { Readable } from "svelte/motion";


export const [typedText, prevTypedText]: [Writable<string>, Readable<string | null>] = withPrevious("", {initPrevious: [""]});
export const text: Writable<string> = writable("")
export const inputFocused: Writable<boolean> = writable(false)

export const appState: Writable<"default" | "running" | "results"> = writable("default")

export const correct: Writable<number> = writable(0);
export const incorrect: Writable<number> = writable(0);

export function resetStores() {
    appState.set("default");
    typedText.set("");
    typedText.set("");
    correct.set(0);
    incorrect.set(0);
}