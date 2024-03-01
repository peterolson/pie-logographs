import { addInflection, addSuffixes, type Case, type GrammaticalNumber } from '../inflection';
import type { LexiconEntry, ParsedWord } from '../lexicon.types';
import { getPIENounInflection, renderPIEWord } from './pie';

const renderers: Record<
	string,
	(
		word: ParsedWord,
		prevWord: ParsedWord | undefined,
		nextWord: ParsedWord | undefined,
		lexicon: LexiconEntry[]
	) => string
> = {
	pie: renderPIEWord
};

export function renderWord(
	word: ParsedWord,
	prevWord: ParsedWord | undefined,
	nextWord: ParsedWord | undefined,
	selectedLanguage: string,
	lexicon: LexiconEntry[]
) {
	if (selectedLanguage in renderers) {
		return renderers[selectedLanguage](word, prevWord, nextWord, lexicon);
	}
	return `${word.char}${addSuffixes(word)}${addInflection(word)}`;
}

const nounInflectors: Record<
	string,
	(entry: LexiconEntry, number: GrammaticalNumber, c: Case) => string
> = {
	pie: getPIENounInflection
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
