export function focusInput() {
    const input: HTMLTextAreaElement | null = document.querySelector("#textInput");
    if (input)
        input.focus();
}