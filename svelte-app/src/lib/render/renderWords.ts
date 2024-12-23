import { addInflection, addSuffixes, type Case, type GrammaticalNumber } from '../inflection';
import type { LexiconEntry, ParsedWord } from '../lexicon.types';
import { renderGreekWord } from './greek';
import { renderHittiteWord } from './hittite';
import { getPIENounInflection, renderPIEWord } from './pie';

const renderers: Record<
	string,
	(
		word: ParsedWord,
		prevWord: ParsedWord | undefined,
		nextWord: ParsedWord | undefined,
		lexicon: LexiconEntry[],
		orthography: string
	) => string
> = {
	pie: renderPIEWord,
	hittite: renderHittiteWord,
	greek: renderGreekWord
};

export function renderWord(
	word: ParsedWord,
	prevWord: ParsedWord | undefined,
	nextWord: ParsedWord | undefined,
	selectedLanguage: string,
	lexicon: LexiconEntry[],
	orthography: string
) {
	if (selectedLanguage in renderers) {
		return renderers[selectedLanguage](word, prevWord, nextWord, lexicon, orthography);
	}
	return `${word.char}${addSuffixes(word)}${addInflection(word, lexicon)}`;
}

const nounInflectors: Record<
	string,
	(entry: LexiconEntry, number: GrammaticalNumber, c: Case) => string
> = {
	pie: (entry, number, c) => getPIENounInflection({ PIE: entry.PIE }, number, c)
};

export function getNounInflection(
	entry: LexiconEntry,
	selectedLanguage: string,
	number: GrammaticalNumber,
	c: Case
) {
	if (selectedLanguage in nounInflectors) {
		return nounInflectors[selectedLanguage](entry, number, c);
	}
	return `${entry.id}_${number}_${c}`;
}
