// font https://fonts.google.com/noto/specimen/Noto+Sans+Cuneiform/glyphs

import type { LexiconEntry, ParsedWord } from '$lib/lexicon.types';
import { expoOut } from 'svelte/easing';
import { getAfterSpace, getInflectedForm, isPunctuation } from './util';

export const cuneiformSyllables: Record<string, string> = {
	// Hittite cuneiform https://en.wikipedia.org/wiki/Hittite_cuneiform
	a: '𒀀',
	e: '𒂊',
	i: '𒄿',
	u: '𒌋',
	ú: '𒌑',
	ba: '𒁀',
	pa: '𒉺',
	da: '𒁕',
	ta: '𒋫',
	ga: '𒂵',
	ka: '𒅗',
	ha: '𒄩',
	la: '𒆷',
	ma: '𒈠',
	na: '𒈾',
	ra: '𒊏',
	sa: '𒊭',
	wa: '𒉿',
	ya: '𒅀',
	za: '𒍝',
	be: '𒁁',
	bi: '𒁉',
	pé: '𒁉',
	pí: '𒁉',
	pi: '𒁉',
	de: '𒁲',
	di: '𒁲',
	te: '𒋼',
	ti: '𒋾',
	ge: '𒄀',
	gi: '𒄀',
	ke: '𒆠',
	ki: '𒆠',
	he: '𒄭',
	hé: '𒄭',
	hi: '𒄭',
	le: '𒇷',
	li: '𒇷',
	me: '𒈨',
	mé: '𒈪',
	mi: '𒈪',
	ne: '𒉈',
	né: '𒉌',
	ni: '𒉌',
	re: '𒊑',
	ri: '𒊑',
	se: '𒊺',
	si: '𒅆',
	wi: '𒃾',
	zi: '𒍣',
	bu: '𒁍',
	pu: '𒁍',
	du: '𒁺',
	tu: '𒌅',
	gu: '𒄖',
	ku: '𒆪',
	hu: '𒄷',
	lu: '𒇻',
	mu: '𒈬',
	nu: '𒉡',
	ru: '𒊒',
	su: '𒋗',
	sú: '𒋙',
	zu: '𒍪',
	ab: '𒀊',
	ap: '𒀊',
	ad: '𒀜',
	at: '𒀜',
	ag: '𒀝',
	ak: '𒀝',
	ah: '𒄴',
	al: '𒀠',
	am: '𒄠',
	an: '𒀭',
	ar: '𒅈',
	as: '𒀸',
	az: '𒊍',
	eb: '𒅁',
	ep: '𒅁',
	ib: '𒅁',
	ip: '𒅁',
	ed: '𒀉',
	et: '𒀉',
	id: '𒀉',
	it: '𒀉',
	eg: '𒅅',
	ek: '𒅅',
	ig: '𒅅',
	ik: '𒅅',
	eh: '𒄴',
	ih: '𒄴',
	el: '𒂖',
	il: '𒅋',
	em: '𒅎',
	im: '𒅎',
	en: '𒂗',
	in: '𒅔',
	er: '𒅕',
	ir: '𒅕',
	es: '𒌍',
	is: '𒅖',
	ez: '𒄑',
	iz: '𒄑',
	ub: '𒌒',
	up: '𒌒',
	ud: '𒌓',
	ut: '𒌓',
	ug: '𒊌',
	uk: '𒊌',
	uh: '𒄴',
	ul: '𒌌',
	um: '𒌝',
	un: '𒌦',
	ur: '𒌨',
	úr: '𒌫',
	us: '𒍑',
	uz: '𒊻',
	kat: '𒃰',
	// Akkadian cuneiform https://akkadian.fandom.com/wiki/Cuneiform
	QÍ: '𒆠',
	BÍ: '𒉈',
	MA: '𒈠'
};

export const hittiteDeterminers: Record<string, [string, string]> = {
	M: ['𒁹', 'ᵐ'],
	MUNUS: ['𒊩', 'ᴹᵁᴺᵁˢ'],
	URU: ['𒌷', 'ᵁᴿᵁ'],
	ID: ['𒀀𒇉', 'ᴵᴰ'],
	D: ['𒀭', 'ᴰ']
};

export const sumerograms: Record<string, string> = {
	DUMU: '𒌉', // https://en.wiktionary.org/wiki/%F0%92%8C%89
	LUGAL: '𒈗', // https://en.wikipedia.org/wiki/Lugal,
	ISKUR: '𒅎', // https://en.wiktionary.org/wiki/%F0%92%80%AD%F0%92%85%8E
	URU: '𒌷' // https://en.wiktionary.org/wiki/%F0%92%8C%B7
};

function renderCuneiformSyllables(word: string): string {
	const [determiner, rest] = word.split(':');
	if (determiner in hittiteDeterminers) {
		return hittiteDeterminers[determiner][0] + renderCuneiformSyllables(rest);
	}
	return word
		.split('-')
		.map((x) => {
			if (x.startsWith('|')) x = x.slice(1);
			if (x in cuneiformSyllables) return cuneiformSyllables[x];
			if (x in sumerograms) return sumerograms[x];
			return x;
		})
		.join('');
}

export function renderHittiteWord(
	word: ParsedWord,
	prevWord: ParsedWord | undefined,
	nextWord: ParsedWord | undefined,
	lexicon: LexiconEntry[],
	orthography: string
) {
	let afterSpace = getAfterSpace(word, nextWord, lexicon);
	const isCuneiform = orthography === 'cuneiform';
	if (isCuneiform) afterSpace = '';
	if (isPunctuation(word)) {
		if (isCuneiform && word.char) return word.char;
		return word.id + afterSpace;
	}
	if (word.id === 'NOW' && nextWord) {
		// check if next word starts with "a", nu -> na
		const nextLexiconEntry = lexicon.find((entry) => entry.id === nextWord.id);
		if (nextLexiconEntry?.hittite?.startsWith('a')) {
			return isCuneiform ? renderCuneiformSyllables('na') : 'na';
		}
	}
	if (word.determiner && word.determinerKey) {
		const determiner = hittiteDeterminers[word.determinerKey][isCuneiform ? 0 : 1];
		if (isCuneiform && word.phonetic) {
			const phonetic = renderCuneiformSyllables(word.phonetic);
			return determiner + phonetic + afterSpace;
		}
		return determiner + word.phonetic?.replaceAll('|', '') + afterSpace;
	}
	const inflectedForm = getInflectedForm('hittite', word, lexicon, afterSpace);
	if (inflectedForm.form) {
		const form = inflectedForm.form;
		if (isCuneiform) {
			if (form in sumerograms) {
				return sumerograms[form];
			}
			return renderCuneiformSyllables(form);
		}
		return form;
	}
	const lexiconEntry = lexicon.find((entry) => entry.id === word.id);
	if (lexiconEntry?.hittite) {
		if (isCuneiform) {
			return renderCuneiformSyllables(lexiconEntry.hittite);
		}
		return lexiconEntry.hittite;
	}
	return 'UNKNOWN HITTITE WORD';
}
