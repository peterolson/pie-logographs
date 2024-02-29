import type { LexiconEntry } from '$lib/lexicon.types';
import { readFileSync } from 'fs';

export function readLexiconFile(): LexiconEntry[] {
	return JSON.parse(readFileSync('../data/lexicon.json', 'utf-8'));
}
