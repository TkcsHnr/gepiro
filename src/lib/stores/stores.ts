import { get, writable, type Writable } from 'svelte/store';
import { withPrevious } from 'svelte-previous';
import type { Readable } from 'svelte/motion';
import { persisted } from 'svelte-persisted-store';

export const [typedText, prevTypedText]: [Writable<string>, Readable<string | null>] = withPrevious(
	'',
	{ initPrevious: [''] }
);

export const text = writable<string>('');
export const inputFocused = writable<boolean>(false);

export const appState = writable<'default' | 'running' | 'results'>('default');

export const correct = writable<number>(0);
export const incorrect = writable<number>(0);
export const accuracy = writable<number>(0);

export const preferences = persisted('preferences', {
	theme: 'dark',
	showKeyboard: true,
	testDuration: 30
});

export const current_key_i = persisted('current_key_i', 0);

export function resetStores() {
	appState.set('default');
	typedText.set('');
	typedText.set('');
	correct.set(0);
	incorrect.set(0);
	accuracy.set(0);
}
