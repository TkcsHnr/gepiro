import { writable, type Writable } from "svelte/store";

export const keyboard: Writable<boolean> = writable(false)