import { get } from "svelte/store";
import { keyboardState, pressedKeys, caps } from "./stores/stores";

export function onKeyDown(e: KeyboardEvent) {
    pressedKeys.update(before => [...new Set([...before, e.code])])

    if(e.code == "CapsLock")
        caps.set(!get(caps))

    updateState()
}

export function onKeyUp(e: KeyboardEvent) {
    pressedKeys.update(before => before.filter((k) => k != e.code))  
    
    updateState()
}

function updateState() {
    let keys = get(pressedKeys)
    let shift: boolean = keys.includes("ShiftLeft") || keys.includes("ShiftRight")
    let alt: boolean = keys.includes("AltLeft") || keys.includes("AltRight")
    let ctrl: boolean = keys.includes("ControlLeft") || keys.includes("ControlRight")

    if((shift || get(caps)) && !alt && !ctrl) 
        keyboardState.set("shift")
    else if(alt && ctrl && !shift)
        keyboardState.set("altgr")
    else 
        keyboardState.set("default")
}