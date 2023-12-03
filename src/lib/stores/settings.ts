import { writable, type Writable } from "svelte/store";

export const keyboard: Writable<boolean> = writable(true)
export const duration: Writable<number> = writable(30)