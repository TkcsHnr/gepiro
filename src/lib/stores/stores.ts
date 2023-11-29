import { writable, type Writable } from "svelte/store";

export const keyboardState: Writable<"default" | "shift" | "altgr" | "caps"> = writable("default")

export const pressedKeys: Writable<string[]> = writable([])
export const caps: Writable<boolean> = writable(false)

export const wrapIndexes: Writable<number[]> = writable([])
export const typedText: Writable<string> = writable("")