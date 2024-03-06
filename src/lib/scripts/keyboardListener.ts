import { get, writable, type Writable } from "svelte/store";
import { focusInput } from "./focusInput";

export const keyboardState = writable<"default" | "shift" | "altgr" | "caps">("default");
export const pressedKeys = writable<string[]>([]);
export const caps = writable<boolean>(false);

export function onKeyDown(e: KeyboardEvent) {
    pressedKeys.update(before => [...new Set([...before, e.code])]);

    updateKeyboardState(e);
}

export function onKeyUp(e: KeyboardEvent) {
    pressedKeys.update(before => before.filter((k) => k != e.code));

    focusInput();

    updateKeyboardState(e);
}

function updateKeyboardState(e: KeyboardEvent) {
    let shift: boolean = e.getModifierState("Shift");
    let alt: boolean = e.getModifierState("Alt");
    let ctrl: boolean = e.getModifierState("Control");
    let altgr: boolean = e.getModifierState("AltGraph");
    caps.set(e.getModifierState("CapsLock"));

    if (get(caps) && !alt && !ctrl && !altgr)
        if (shift)
            keyboardState.set("default")
        else
            keyboardState.set("caps")
    else if (shift && !alt && !ctrl && !altgr)
        keyboardState.set("shift")
    else if (((alt && ctrl) || altgr) && !shift)
        keyboardState.set("altgr")
    else
        keyboardState.set("default")
}