import { writable, type Writable } from "svelte/store";

export const typedText: Writable<string> = writable("")
export const text: Writable<string> = writable("")
export const inputFocused: Writable<boolean> = writable(false)