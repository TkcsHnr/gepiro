import { words } from '$lib/words.json';
import { text } from '$lib/stores/stores';

const length = words.length;

export async function generateWords(number: number, array?: boolean): Promise<boolean> {
    let wordList: string[] = [];

    for(let i = 0; i < number; i++) {
        wordList.push(
            words[~~(Math.random() * length)]
        );
    }
    
    text.set(wordList.join(" "));

    return true;
}