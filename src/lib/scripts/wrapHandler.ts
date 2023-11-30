import { wrapIndexes } from "$lib/stores/stores";

export function assignWraps(): void {
    const text: HTMLParagraphElement | null = document.querySelector("#text");
    if (!text) return;

    let row = 0
    let index = 0;
    wrapIndexes.set([]);
    [...text.children].forEach((el: any) => {
        if (!el.previousElementSibling || el.offsetLeft < el.previousElementSibling.offsetLeft) {
            row += 1;
            if (row > 2)
                wrapIndexes.update(before => [...before, index]);
        }
        index++;
    });
};