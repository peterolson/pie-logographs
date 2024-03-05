import { suffixes, type Case, type GrammaticalNumber } from '$lib/inflection';
import type { LexiconEntry, ParsedWord } from '$lib/lexicon.types';
import { getAfterSpace, getInflectedForm } from './util';

export function renderPIEWord(
	word: ParsedWord,
	prevWord: ParsedWord | undefined,
	nextWord: ParsedWord | undefined,
	lexicon: LexiconEntry[]
) {
	const afterSpace = getAfterSpace(word, nextWord, lexicon);
	const lexiconEntry = lexicon.find((entry) => entry.id === word.id);
	if (!lexiconEntry) {
		if (word.determiner) {
			let phonetic = word.phonetic;
			if (phonetic?.includes('-')) {
				let joined = phonetic.split('-').join('');
				if (joined.includes('|')) {
					joined = joined.split('|')[0];
				}
				// remove duplicate vowels
				phonetic = joined.replace(/([aeiou])\1+/g, '$1');
			}
			if (word.case && phonetic && word.number) {
				phonetic = getPIENounInflection({ PIE: phonetic }, word.number, word.case);
			}
			return phonetic + afterSpace;
		}
		return word.id + afterSpace;
	}
	let pie = lexiconEntry.PIE;
	if (!pie) return word.id;
	if (pie.startsWith('*')) {
		pie = pie.slice(1);
	}
	if (pie.startsWith('-')) {
		pie = pie.slice(1);
	}

	if (pie.endsWith('-')) pie = pie.slice(0, -1);

	const inflectedForm = getInflectedForm('pie', word, lexicon, afterSpace);
	if (typeof inflectedForm.suffixText === 'string')
		return `${pie}${inflectedForm.suffixText}${afterSpace}`;
	return inflectedForm.form;
}

export function getPIENounInflection(
	entry: { PIE: string | undefined },
	number: GrammaticalNumber,
	c: Case
) {
	let root = entry.PIE || '';
	if (root.startsWith('*')) {
		root = root.slice(1);
	}
	if (root.endsWith('-') || root.endsWith('s')) {
		root = root.slice(0, -1);
	}
	const variants: Record<string, Record<string, string>> = {
		sg: {
			nom: 's',
			voc: '',
			acc: 'm',
			dat: 'ey',
			gen: 's',
			abl: 's',
			loc: 'i',
			ins: 'h₁'
		},
		dual: {
			nom: 'h₁e',
			voc: 'h₁e',
			acc: 'h₁e'
		},
		pl: {
			nom: 'es',
			voc: 'es',
			acc: 'ms',
			dat: 'mos',
			gen: 'om',
			abl: 'mos',
			loc: 'su',
			ins: 'mis'
		}
	};
	return (root + (variants[number][c] ?? '')).replaceAll('wie', 'wye').replaceAll('ii', 'i');
}
