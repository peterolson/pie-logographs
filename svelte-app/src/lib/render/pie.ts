import { suffixes, type Case, type GrammaticalNumber } from '$lib/inflection';
import type { LexiconEntry, ParsedWord } from '$lib/lexicon.types';

const noSpaceBefore = new Set(['.', ',', ':', ';', '?', '!', ')', "'", "''"]);
const noSpaceAfter = new Set(['(', '`', '``']);

export function renderPIEWord(
	word: ParsedWord,
	prevWord: ParsedWord | undefined,
	nextWord: ParsedWord | undefined,
	lexicon: LexiconEntry[]
) {
	const lexiconEntry = lexicon.find((entry) => entry.id === word.id);
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

	if (!lexiconEntry) {
		if (word.determiner) {
			return word.phonetic + afterSpace;
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

	if (nextWord?.id) {
		const nextLexiconEntry = lexicon.find((entry) => entry.id === nextWord.id);
		const nextPIE = nextLexiconEntry?.PIE;
		if (nextPIE?.startsWith('*-') || nextPIE?.startsWith('-')) {
			afterSpace = '';
		}
	}
	if (pie.endsWith('-')) pie = pie.slice(0, -1);
	let suffixText = '';
	let rawSuffixText = '';
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
		rawSuffixText = word.suffixes.join('');
	}

	if (word.pos) {
		const missingInflection = `${pie}${suffixText}{MISSING INFLECTION}${afterSpace}`;
		if (!lexiconEntry.inflections) {
			return missingInflection;
		}
		const pieInflection = lexiconEntry.inflections['pie'];
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
			return `${pie}${suffixText}{unmatched key: ${key}}${afterSpace}`;
		}
		return `${posInflection[key]}${afterSpace}`;
	}

	return `${pie}${suffixText}${afterSpace}`;
}

export function getPIENounInflection(entry: LexiconEntry, number: GrammaticalNumber, c: Case) {
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
