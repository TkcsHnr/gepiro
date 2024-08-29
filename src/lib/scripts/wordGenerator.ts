import { all, letters } from '$lib/words.json';
import { text } from '$lib/stores/stores';
import { preferences } from '$lib/stores/stores';
import { get } from 'svelte/store';

export async function generateTest(number?: number): Promise<string[]> {
    let wordList: string[] = [];
    
    if(!number)
        number = 300 * (get(preferences).testDuration / 60);
    for(let i = 0; i < number; i++) {
        wordList.push(
            all[~~(Math.random() * all.length)]
        );
    }
    
    text.set(wordList.join(" "));

    return wordList;
}

export async function generateLesson(letter: string): Promise<string[]> {
    let wordList: string[] = [letter, letter, letter, letter+letter, letter+letter, letter+letter];

    let source = letters[letter];
    for(let i = 0; i < 20; i++) {
        wordList.push(
            source[~~(Math.random() * source.length)]
        );
    }

    text.set(wordList.join(" "));

    return wordList;
}