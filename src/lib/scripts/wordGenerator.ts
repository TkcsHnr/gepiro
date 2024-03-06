import { all, letters } from '$lib/words.json';
import { text } from '$lib/stores/stores';
import { preferences } from '$lib/stores/stores';
import { get } from 'svelte/store';

export async function generateWords(number?: number, letter?: string): Promise<string[]> {
    let wordList: string[] = [];
    
    let source = letter ? letters[`${letter}`] : all;
    if(!number)
        number = 200 * (get(preferences).testDuration / 60);
    for(let i = 0; i < number; i++) {
        wordList.push(
            source[~~(Math.random() * source.length)]
        );
    }
    
    text.set(wordList.join(" "));

    return wordList;
}