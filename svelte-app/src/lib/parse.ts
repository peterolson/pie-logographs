import {
	numbers,
	genders,
	cases,
	persons,
	verbTypes,
	voices,
	suffixes,
	formationTypes,
	type GrammaticalNumber,
	type Gender,
	type Case,
	type Person,
	type VerbType,
	type Voice,
	type FormationType
} from './inflection.js';
import type { LexiconEntry, ParsedWord } from './lexicon.types.js';

function parseLine(line: string, lexicon: LexiconEntry[]): ParsedWord[] {
	const tokens = line.split(' ');
	let currentWord: ParsedWord | null = null;
	let prefix: { id: string; char?: string }[] = [];
	const result: ParsedWord[] = [];
	for (const token of tokens) {
		if (token.trim() === '') continue;
		const lexiconEntry = lexicon.find((x) => x.id === token.trim());
		if (lexiconEntry) {
			if (currentWord) {
				result.push(currentWord);
			}
			if (token.endsWith('-')) {
				prefix.push({
					id: token,
					char: lexiconEntry.char
				});
				currentWord = null;
				continue;
			}
			currentWord = {
				id: token,
				char: lexiconEntry.char,
				prefix: prefix
			};
			prefix = [];
		} else if (!currentWord) {
			console.error('Expected lexicon entry, got: ' + token);
		} else if ((numbers as readonly string[]).includes(token)) {
			currentWord.number = token as GrammaticalNumber;
		} else if ((genders as readonly string[]).includes(token)) {
			currentWord.gender = token as Gender;
		} else if ((cases as readonly string[]).includes(token)) {
			currentWord.case = token as Case;
		} else if ((persons as readonly string[]).includes(token)) {
			currentWord.person = token as Person;
		} else if (token in verbTypes) {
			currentWord.verbType = token as VerbType;
		} else if ((voices as readonly string[]).includes(token)) {
			currentWord.voice = token as Voice;
		} else if (token in suffixes) {
			currentWord.suffixes = currentWord.suffixes || [];
			currentWord.suffixes.push(token);
		} else if (token in formationTypes) {
			currentWord.formation = token as FormationType;
		} else {
			console.error('Unknown token: ' + token);
		}
	}
	if (currentWord) {
		result.push(currentWord);
	}

	for (const item of result) {
		if (item.gender) {
			item.pos = 'adj';
		} else if (item.case) {
			item.pos = 'noun';
		} else if (item.person || item.voice || item.verbType) {
			item.pos = 'verb';
		}
	}

	return result;
}

export function parse(input: string, lexicon: LexiconEntry[]): ParsedWord[][] {
	return input
		.trim()
		.split('  \n')
		.map((x) => parseLine(x, lexicon));
}
