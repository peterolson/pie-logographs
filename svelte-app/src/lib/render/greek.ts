import type { LexiconEntry, ParsedWord } from '$lib/lexicon.types';
import { getAfterSpace, getInflectedForm } from './util';

export function renderGreekWord(
	word: ParsedWord,
	prevWord: ParsedWord | undefined,
	nextWord: ParsedWord | undefined,
	lexicon: LexiconEntry[]
) {
	const afterSpace = getAfterSpace(word, nextWord, lexicon);
	const lexiconEntry = lexicon.find((entry) => entry.id === word.id);
	if (!lexiconEntry) {
		return 'UNKNOWN WORD:' + word.id;
	}
	const greek = lexiconEntry.greek;
	if (!greek) return 'UNKNOWN GREEK WORD';

	const inflectedForm = getInflectedForm('greek', word, lexicon, afterSpace);
	if (typeof inflectedForm.suffixText === 'string')
		return `${greek}${inflectedForm.suffixText}${afterSpace}`;
	return inflectedForm.form;
}
