import type { LexiconEntry } from '$lib/lexicon.types';

let lexicon: LexiconEntry[] = [];

export async function getLexicon() {
	if (lexicon.length) return lexicon;
	const res = await fetch('/lexicon/download');
	lexicon = await res.json();
	return lexicon;
}

export async function updateLexicon(updatedLexicon: LexiconEntry[]) {
	lexicon = updatedLexicon;
	return lexicon;
}
