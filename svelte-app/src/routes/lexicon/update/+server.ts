import { json } from '@sveltejs/kit';
import type { LexiconEntry } from '$lib/lexicon.types';
import { writeFileSync } from 'fs';

export async function PUT({ request }) {
	const body = await request.json();
	const updatedEntry = body.updatedEntry as LexiconEntry;
	const entryIndex = body.entryIndex as number;
	const characterEntryIndex = body.characterEntryIndex as number;
	const lexicon = body.lexicon as LexiconEntry[];
	if (entryIndex >= 0 && entryIndex < lexicon.length) {
		lexicon[entryIndex] = updatedEntry;
		if (characterEntryIndex >= 0 && characterEntryIndex < lexicon.length) {
			lexicon.splice(characterEntryIndex, 1);
		}
		// update lexicon.json
		writeFileSync('../data/lexicon.json', JSON.stringify(lexicon, null, 4));
	}
	return json(lexicon);
}
