import { writable, type Writable } from "svelte/store";

export const keyboard: Writable<boolean> = writable(true)
export const keyboardSize: Writable<string> = writable("lg")
export const duration: Writable<number> = writable(30)