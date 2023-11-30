import { get } from "svelte/store";
import { keyboardState, pressedKeys, caps } from "../stores/stores";

export function onKeyDown(e: KeyboardEvent) {
    pressedKeys.update(before => [...new Set([...before, e.code])]);

    if (e.code == "CapsLock")
        caps.set(!get(caps));

    updateKeyboardState(e);
}

export function onKeyUp(e: KeyboardEvent) {
    pressedKeys.update(before => before.filter((k) => k != e.code))

    const input: HTMLTextAreaElement | null = document.querySelector("#textInput");
    if (input)
        input.focus();

    updateKeyboardState(e)
}

function updateKeyboardState(e: KeyboardEvent) {
    let shift: boolean = e.getModifierState("Shift");
    let alt: boolean = e.getModifierState("Alt");
    let ctrl: boolean = e.getModifierState("Control");
    let altgr: boolean = e.getModifierState("AltGraph");

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