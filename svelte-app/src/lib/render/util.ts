import { suffixes } from '$lib/inflection';
import type { LexiconEntry, ParsedWord } from '$lib/lexicon.types';

const noSpaceBefore = new Set(['.', ',', ':', ';', '?', '!', ')', "'", "''"]);
const noSpaceAfter = new Set(['(', '`', '``']);

export function isPunctuation(word: ParsedWord) {
	return noSpaceAfter.has(word.id.trim()) || noSpaceBefore.has(word.id.trim());
}

export function getAfterSpace(
	word: ParsedWord,
	nextWord: ParsedWord | undefined,
	lexicon: LexiconEntry[]
) {
	let afterSpace = ' ';
	if (noSpaceBefore.has(nextWord?.id?.trim() ?? '')) {
		afterSpace = '';
	}
	if (noSpaceAfter.has(word.id.trim())) {
		afterSpace = '';
	}
	if (word.id.endsWith('-')) {
		afterSpace = '';
	}
	if (nextWord?.id) {
		const nextLexiconEntry = lexicon.find((entry) => entry.id === nextWord.id);
		const nextPIE = nextLexiconEntry?.PIE;
		if (nextPIE?.startsWith('*-') || nextPIE?.startsWith('-')) {
			afterSpace = '';
		}
	}
	return afterSpace;
}

export function getInflectedForm(
	language: string,
	word: ParsedWord,
	lexicon: LexiconEntry[],
	afterSpace: string
) {
	const lexiconEntry = lexicon.find((entry) => entry.id === word.id);
	if (!lexiconEntry) {
		return { form: 'UNKNOWN WORD:' + word.id };
	}

	let rawSuffixText = '';
	let suffixText = '';
	if (word.suffixes) {
		suffixText = word.suffixes
			.map((suffix) => {
				const suffixInfo = suffixes[suffix];
				if (suffixInfo) {
					return suffixInfo.form;
				}
				return suffix;
			})
			.join('');
		rawSuffixText = word.suffixes.join(' ');
	}
	if (word.adjNounFormation) {
		rawSuffixText = word.adjNounFormation.slice(1);
	}

	if (word.pos) {
		const missingInflection = {
			form: `${word.id}${rawSuffixText}{MISSING INFLECTION}${afterSpace}`
		};
		if (!lexiconEntry.inflections) {
			return missingInflection;
		}
		const pieInflection = lexiconEntry.inflections[language];
		if (!pieInflection) {
			return missingInflection;
		}
		const suffixInflection = pieInflection[rawSuffixText];
		if (!suffixInflection) {
			return missingInflection;
		}
		const posInflection = suffixInflection[word.pos];
		if (!posInflection) {
			return missingInflection;
		}
		let key = '';
		if (word.pos === 'noun') {
			key = `${word.number} ${word.case}`;
		} else if (word.pos === 'adj') {
			key = `${word.gender} ${word.number} ${word.case}`;
		} else if (word.pos === 'verb') {
			key = `${word.formation} ${word.voice} ${word.verbType} ${word.number} ${word.person}`;
		}
		if (!posInflection[key]) {
			return { form: `${word.id}${suffixText}{unmatched key: ${key}}${afterSpace}` };
		}
		return { form: `${posInflection[key]}${afterSpace}` };
	}
	return { form: null, suffixText };
}
