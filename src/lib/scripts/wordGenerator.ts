import { words } from '$lib/words.json';
import { text } from '$lib/stores/stores';
import { duration } from '$lib/stores/settings';
import { get } from 'svelte/store';

const length = words.length;

export async function generateWords(number?: number): Promise<boolean> {
    let wordList: string[] = [];

    if(!number)
        number = 200 * (get(duration) / 60);
    for(let i = 0; i < number; i++) {
        wordList.push(
            words[~~(Math.random() * length)]
        );
    }
    
    text.set(wordList.join(" "));

    return true;
}