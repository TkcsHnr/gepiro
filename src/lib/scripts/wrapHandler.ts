import { wrapIndexes } from "../stores/stores";

export function assignWraps() {
    const text: any = document.querySelector("#text");

    let row = 0
    let index = 0;
    wrapIndexes.set([]);
    [...text.children].forEach((el) => {
        if (!el.previousElementSibling || el.offsetLeft < el.previousElementSibling.offsetLeft) {
            row += 1;
            if(row > 2)
                wrapIndexes.update(before => [...before, index]);      
        }        
        index++;
    });
};

