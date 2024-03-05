import { pieTextToHangul } from './hangul';
import type { ParsedWord } from './lexicon.types';

export const numbers = ['sg', 'dual', 'pl'] as const;
export const genders = ['m', 'f', 'n'] as const;
export const cases = ['nom', 'gen', 'dat', 'acc', 'ins', 'loc', 'voc', 'abl'] as const;

export const persons = ['1', '2', '3'] as const;
export const voices = ['active', 'middle', 'stative'] as const;
export const verbTypes = {
	prim: 'Primary',
	sec: 'Secondary',
	subj: 'Subjunctive',
	opt: 'Optative',
	imp: 'Imperative',
	part: 'Participle'
} as const;

export const formationTypes = {
	_ira: 'imperfective root athematic',
	_iran: 'imperfective root athematic (Narten type)',
	_irt: 'imperfective root thematic',
	_irtt: 'imperfective root thematic (tudati type)',
	_ire: 'imperfective e-reduplicated athematic',
	_iri: 'imperfective i-reduplicated athematic',
	_irr: 'imperfective reduplicated thematic',
	_irn: 'imperfective nasal infix',
	_pra: 'perfective root athematic',
	_prt: 'perfective root thematic',
	_prr: 'perfective reduplicated thematic',
	_sr: 'stative root',
	_srr: 'stative reduplicated'
} as const;
export type GrammaticalNumber = (typeof numbers)[number];
export type Gender = (typeof genders)[number];
export type Case = (typeof cases)[number];
export type Person = (typeof persons)[number];
export type Voice = (typeof voices)[number];
export type VerbType = keyof typeof verbTypes;
export type FormationType = keyof typeof formationTypes;

export const suffixes: Record<
	string,
	{
		form: string;
		link: string;
		desc: string | string[];
		alias?: string;
		shortForm?: string;
		combo?: string[];
	}
> = {
	deti: {
		form: 'dʰh₁eti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-d%CA%B0h%E2%82%81eti',
		desc: 'Forms resultative verbs.',
		shortForm: '爲'
	},
	dlom: {
		form: 'dʰlom',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-d%CA%B0lom',
		desc: 'Forms nouns denoting a tool or instrument.',
		alias: 'trom'
	},
	drom: {
		form: 'dʰrom',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-d%CA%B0rom',
		desc: 'Forms nouns denoting a tool or instrument.',
		alias: 'trom'
	},
	trom: {
		form: 'trom',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-trom',
		desc: 'Forms nouns denoting a tool or instrument.'
	},
	en: {
		form: 'ḗn',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%E1%B8%97n',
		desc: 'Derives nouns from roots.'
	},
	ehti: {
		form: 'éh₁ti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%A9h%E2%82%81ti',
		desc: [
			'Creates inchoative (or fientive) verbs from perfective roots.',
			'Creates inchoative (or fientive) verbs from nominals.'
		],
		shortForm: 'eh₁'
	},
	yeti: {
		form: 'yeti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-yeti',
		desc: 'Creates transitive imperfective verbs from roots.',
		shortForm: 'ye'
	},
	ehyeti: {
		form: 'éh₁yeti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%A9h%E2%82%81yeti',
		desc: 'Thematicization of the athematic stative verbal suffix; see *-yeti.',
		shortForm: 'eh₁ye'
	},
	eh2: {
		form: 'éh₂',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%A9h%E2%82%82',
		desc: ['Creates collective nouns and mass nouns.', 'Creates action nouns and abstract nouns.'],
		shortForm: 'eh₂'
	},
	ye_ti: {
		form: 'yéti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-y%C3%A9ti',
		desc: 'Creates intransitive, often deponent, imperfective verbs from roots.',
		shortForm: 'yé'
	},
	eh2yeti: {
		form: 'eh₂yéti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-eh%E2%82%82y%C3%A9ti',
		desc: ['Creates iterative/ frequentative/ intensive verbs.', 'Creates causative verbs.'],
		shortForm: 'eh₂ye'
	},
	es: {
		form: 'ēs',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C4%93s',
		desc: 'Primarily forms adjectival bahuvrīhi compounds'
	},
	eyeti: {
		form: 'éyeti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%A9yeti',
		desc: [
			'Forms causative imperfective verbs from roots.',
			'Forms iterative or frequentative imperfective verbs from roots.'
		],
		shortForm: 'éye'
	},
	eyti: {
		form: 'éyti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%A9yti',
		desc: 'Forms aktionsart verbs from roots.',
		shortForm: 'éy'
	},
	tos: {
		form: 'tós',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-t%C3%B3s',
		desc: 'Creates verbal adjectives from verb stems.'
	},
	eh2tos: {
		form: 'éh₂tós',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-eh%E2%82%82tos',
		desc: 'Forms adjectives from nouns, indicating the possession of a thing or a quality.',
		combo: ['eh2', 'tos']
	},
	hseti: {
		form: 'seti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-(h%E2%82%81)seti',
		desc: 'Creates desiderative imperfective verbs from roots.'
	},
	h2: {
		form: 'h₂',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-h%E2%82%82',
		desc: 'Creates collective nouns, which refer to groups or sets. The semantic extension from abstract/collective to feminine is comparable to the one of Proto-Semitic *-at-.'
	},
	h2ti: {
		form: 'h₂ti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-h%E2%82%82ti',
		desc: 'Forms factitive verbs from adjective stems.'
	},
	Ho: {
		form: 'Hō',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-H%C5%8D',
		desc: 'Derives adjectives, nouns indicating possession, denoting burden, authority.'
	},
	ih2: {
		form: 'ih₂',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-ih%E2%82%82',
		desc: 'Feminizes athematic nominal stems.'
	},
	iHnos: {
		form: 'iHnos',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-iHnos',
		desc: 'Creates adjectives of materials.'
	},
	is: {
		form: 'is',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-is',
		desc: 'Forms nouns from verbs.'
	},
	iskos: {
		form: 'iskos',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-iskos',
		desc: 'Characteristic of, typical of, pertaining to'
	},
	kos: {
		form: 'kos',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-kos',
		desc: 'Creates deadjectival and desubstantival adjectives denoting the characteristic of, typical of, pertaining to.'
	},
	kt: {
		form: 'kt',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-kt',
		desc: 'Forms perfective verbs from roots.'
	},
	los: {
		form: 'lós',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-l%C3%B3s',
		desc: [
			'Forms agent nouns from verbal roots.',
			'Forms diminutive nouns from noun stems.',
			'Forms adjectives with the sense “pertaining to …” (alternative form of *-rós). '
		]
	},
	men: {
		form: 'mḗn',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-m%E1%B8%97n',
		desc: 'Creates agent nouns from verbs.',
		alias: 'mo'
	},
	mo: {
		form: 'mō',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-m%C5%8D',
		desc: 'Creates agent nouns from verbs.'
	},
	mn: {
		form: 'mn̥',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-mn%CC%A5',
		desc: 'Creates action nouns or result nouns from verbs.'
	},
	mhnos: {
		form: 'mh₁nos',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-mh%E2%82%81nos',
		desc: 'forms the middle participle'
	},
	mos: {
		form: 'mós',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-m%C3%B3s',
		desc: 'Creates action/result nouns from verb stems.'
	},
	newti: {
		form: 'néwti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-n%C3%A9wti',
		desc: 'Forms transitive imperfective verbs from roots.',
		shortForm: 'nu'
	},
	nos: {
		form: 'nós',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-n%C3%B3s',
		desc: 'Creates verbal adjectives from roots.'
	},
	o: {
		form: 'ō',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C5%8D',
		desc: [
			'(productive) Forms so-called “individualizing” or “participant” nouns from nouns and adjectives, agent or patient nouns from verbs.',
			'(rare) Derives nouns from nouns or roots, often with unclear semantic distinction.'
		]
	},
	o_nts: {
		form: 'ónts',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%B3nts',
		desc: 'Derives nouns denoting body parts.'
	},
	o_s: {
		form: 'ós',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%B3s',
		desc: "Creates agent nouns from verb stems, denoting someone or something that performs that verb's action."
	},
	oos: {
		form: 'ōs',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C5%8Ds',
		desc: 'Creates masculine and feminine action nouns or result nouns from verbs.'
	},
	otr: {
		form: 'ótr̥',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-%C3%B3tr%CC%A5',
		desc: 'Derives action nouns from verbal stems.'
	},
	onts: {
		form: 'onts',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-onts',
		desc: 'Forms adjectives from Caland system roots.'
	},
	os: {
		form: 'os',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-os',
		desc: 'Creates action nouns or result nouns from verbs.'
	},
	oyeti: {
		form: 'oyéti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-oy%C3%A9ti',
		desc: 'Creates factitive verbs from adjectives.',
		shortForm: 'oye'
	},
	r: {
		form: 'r̥',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-r%CC%A5',
		desc: 'Derives nouns from roots, frequently mass nouns.'
	},
	ros: {
		form: 'rós',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-r%C3%B3s',
		desc: 'Forms adjectives from Caland system roots.'
	},
	s: {
		form: 's',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-s',
		desc: 'Derives nouns from roots.'
	},
	seti: {
		form: 'seti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-seti',
		desc: 'Forms primary verbs.',
		shortForm: 'se'
	},
	sketi: {
		form: 'sḱéti',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-s%E1%B8%B1%C3%A9ti',
		desc: 'Forms durative or iterative imperfective verbs from roots.',
		shortForm: 'sḱé'
	},
	sneh2: {
		form: 'sneh₂',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-sneh%E2%82%82',
		desc: 'Used to form nouns denoting an object'
	},
	sor: {
		form: 'sōr',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-s%C5%8Dr',
		desc: 'Derives feminine gender stems from roots'
	},
	st: {
		form: 'st',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-st',
		desc: 'Forms perfective verbs from roots.'
	},
	ter: {
		form: 'tér',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-t%E1%B8%97r',
		desc: "Derives agent nouns from verbs, denoting someone or something whose role or purpose it is to perform the verb's action."
	},
	teh2: {
		form: 'téh₂',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-teh%E2%82%82',
		desc: 'Used to form nouns representing state of being'
	},
	teh2ts: {
		form: 'teh₂ts',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-teh%E2%82%82ts',
		desc: 'Used to form nouns representing state of being'
	},
	teros: {
		form: 'teros',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-teros',
		desc: 'Contrastive or oppositional adjectival suffix.'
	},
	tis: {
		form: 'tis',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tis',
		desc: 'Derives abstract/action nouns from verb roots.'
	},
	tlom: {
		form: 'tlom',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tlom',
		desc: 'Forms nouns denoting a tool or instrument.'
	},
	tmmos: {
		form: 'tm̥mós',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tm%CC%A5m%C3%B3s',
		desc: 'absolute superlative adjectival suffix.'
	},
	tnnos: {
		form: 'tn̥nós',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tn%CC%A5n%C3%B3s',
		desc: 'Used to form adjectives related to time',
		shortForm: '及nos'
	},
	tor: {
		form: 'tōr',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-t%C5%8Dr',
		desc: "Derives agent nouns from verbs, denoting someone or something who has performed the verb's action."
	},
	tr: {
		form: 'tr̥',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tr%CC%A5',
		desc: 'Derives nouns from verbal roots.'
	},
	trih2: {
		form: 'trih₂',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-trih%E2%82%82',
		desc: "Derives agent nouns from verbs, denoting someone or something who has performed the verb's action.",
		combo: ['tr', 'ih2']
	},
	tus: {
		form: 'tus',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tus',
		desc: 'Derives action nouns from verb roots.'
	},
	tweh2: {
		form: 'tweh₂',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-tweh%E2%82%82',
		desc: 'Forms nouns from verbs',
		combo: ['tus', 'eh2']
	},
	us: {
		form: 'us',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-us',
		desc: 'Forms adjectives from Caland system roots.'
	},
	wents: {
		form: 'wénts',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-w%C3%A9nts',
		desc: 'Forms possessive adjectives from nominal stems.'
	},
	wo_s: {
		form: 'wós',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-w%C3%B3s',
		desc: 'Creates adjectives from verb stems.'
	},
	woos: {
		form: 'wōs',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-w%C5%8Ds',
		desc: 'Forms perfect participles from verbs.'
	},
	wr: {
		form: 'wr̥',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-wr%CC%A5',
		desc: `Derives object nouns from verbal roots. e.g. per- "to go through" -> pérwr̥ "ford, crossing"`
	},
	yeh: {
		form: 'yéh₁',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-y%C3%A9h%E2%82%81-',
		desc: 'Forms the optative mood of verbs.'
	},
	yo_s: {
		form: 'yós',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-y%C3%B3s',
		desc: 'Creates adjectives from verb stems.'
	},
	yoos: {
		form: 'yōs',
		link: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/-y%C5%8Ds',
		desc: `Forms adjectives from roots, meaning "very" or "rather".`
	}
};

export type Suffix = (typeof suffixes)[keyof typeof suffixes];

const hangulInitials = [
	'ㄱ',
	'ㄲ',
	'ㄴ',
	'ㄷ',
	'ㄸ',
	'ㄹ',
	'ㅁ',
	'ㅂ',
	'ㅃ',
	'ㅅ',
	'ㅆ',
	'ㅇ',
	'ㅈ',
	'ㅉ',
	'ㅊ',
	'ㅋ',
	'ㅌ',
	'ㅍ',
	'ㅎ'
];
const hangulMedials = [
	'ㅏ',
	'ㅐ',
	'ㅑ',
	'ㅒ',
	'ㅓ',
	'ㅔ',
	'ㅕ',
	'ㅖ',
	'ㅗ',
	'ㅘ',
	'ㅙ',
	'ㅚ',
	'ㅛ',
	'ㅜ',
	'ㅝ',
	'ㅞ',
	'ㅟ',
	'ㅠ',
	'ㅡ',
	'ㅢ',
	'ㅣ'
];
const hangulFinals = [
	'',
	'ㄱ',
	'ㄲ',
	'ㄳ',
	'ㄴ',
	'ㄵ',
	'ㄶ',
	'ㄷ',
	'ㄹ',
	'ㄺ',
	'ㄻ',
	'ㄼ',
	'ㄽ',
	'ㄾ',
	'ㄿ',
	'ㅀ',
	'ㅁ',
	'ㅂ',
	'ㅄ',
	'ㅅ',
	'ㅆ',
	'ㅇ',
	'ㅈ',
	'ㅊ',
	'ㅋ',
	'ㅌ',
	'ㅍ',
	'ㅎ'
];

function hangulSyllable(initial: string, medial: string, final: string) {
	const initialIndex = hangulInitials.indexOf(initial);
	const medialIndex = hangulMedials.indexOf(medial);
	const finalIndex = hangulFinals.indexOf(final);
	return String.fromCharCode(44032 + initialIndex * 588 + medialIndex * 28 + finalIndex);
}

function convertAdjInflection(gen: Gender | '', num: GrammaticalNumber, cas: Case) {
	const initials = {
		m: {
			sg: 'ㄱ',
			dual: 'ㄲ',
			pl: 'ㅋ'
		},
		f: {
			sg: 'ㅅ',
			dual: 'ㅆ',
			pl: 'ㅈ'
		},
		n: {
			sg: 'ㄷ',
			dual: 'ㄸ',
			pl: 'ㅁ'
		},
		'': {
			sg: 'ㅇ',
			dual: 'ㅃ',
			pl: 'ㅂ'
		}
	};
	const initial = initials[gen][num];
	const medials = {
		nom: 'ㅣ',
		voc: 'ㅏ',
		acc: 'ㅡ',
		gen: 'ㅗ',
		dat: 'ㅜ',
		ins: 'ㅓ',
		loc: 'ㅐ',
		abl: 'ㅔ'
	};
	const medial = medials[cas];
	return hangulSyllable(initial, medial, '');
}

function convertVerbInflection(
	number: GrammaticalNumber,
	person: Person,
	voice: Voice,
	type: VerbType,
	formation: FormationType
) {
	const initials = {
		1: {
			sg: 'ㄱ',
			dual: 'ㄲ',
			pl: 'ㅋ'
		},
		2: {
			sg: 'ㅅ',
			dual: 'ㅆ',
			pl: 'ㅈ'
		},
		3: {
			sg: 'ㄷ',
			dual: 'ㄸ',
			pl: 'ㅁ'
		}
	};
	const initial = type === 'part' ? 'ㄴ' : initials[person][number];
	const medials = {
		active: {
			prim: 'ㅏ',
			sec: 'ㅓ',
			subj: 'ㅑ',
			opt: 'ㅕ',
			imp: 'ㅣ',
			part: 'ㅐ'
		},
		middle: {
			prim: 'ㅗ',
			sec: 'ㅜ',
			subj: 'ㅛ',
			opt: 'ㅠ',
			imp: 'ㅡ',
			part: 'ㅢ'
		},
		stative: {
			prim: 'ㅔ',
			part: 'ㅘ',
			sec: 'ㅓ',
			subj: 'ㅑ',
			opt: 'ㅕ',
			imp: 'ㅣ'
		}
	};
	const medial = medials[voice][type];
	const finals = {
		_ira: '',
		_iran: 'ㅇ',
		_irt: 'ㄱ',
		_irtt: 'ㄷ',
		_ire: 'ㄵ',
		_iri: 'ㄶ',
		_irr: 'ㄲ',
		_irn: 'ㅁ',
		_pra: 'ㅅ',
		_prt: 'ㅈ',
		_prr: 'ㅆ',
		_sr: 'ㅂ',
		_srr: 'ㅍ'
	};
	const final = finals[formation];
	return hangulSyllable(initial, medial, final);
}

export function addSuffixes(word: ParsedWord) {
	if (!word.suffixes) return '';
	if (!word.suffixes.length) return '';
	const parts = [];
	for (const suffix of word.suffixes) {
		if (suffix in suffixes) {
			const suffixData = suffixes[suffix as keyof typeof suffixes];
			const form = suffixData.shortForm || suffixData.form;
			parts.push(pieTextToHangul(form));
		} else {
			console.error('Unknown suffix: ' + suffix);
		}
	}
	return parts.join('');
}

export function addInflection(word: ParsedWord) {
	if (word.pos === 'adj') {
		word.gender = word.gender || 'm';
		word.number = word.number || 'sg';
		word.case = word.case || 'nom';
		if (
			word.gender === 'm' &&
			word.number === 'sg' &&
			word.case === 'nom' &&
			!word.suffixes?.length
		) {
			return '';
		}
		return convertAdjInflection(word.gender, word.number, word.case);
	}
	if (word.pos === 'noun') {
		word.number = word.number || 'sg';
		word.case = word.case || 'nom';
		if (word.number === 'sg' && word.case === 'nom' && !word.suffixes?.length && !word.determiner) {
			return '';
		}
		return convertAdjInflection('', word.number, word.case);
	}
	if (word.pos === 'verb') {
		if (!word.verbType) {
			console.error('No verb type for', word.id);
		}
		if (!word.formation && !word.suffixes) {
			console.error('No formation for', word.id);
		}
		word.number = word.number || 'sg';
		word.person = word.person || '3';
		word.voice = word.voice || 'active';
		word.verbType = word.verbType || 'sec';
		word.formation = word.formation || '_ira';
		return convertVerbInflection(
			word.number,
			word.person,
			word.voice,
			word.verbType,
			word.formation
		);
	}
	return '';
}

//https://en.wikipedia.org/wiki/Hittite_cuneiform#Determiners
export const determiners = {
	M: ['イ', 'Male personal name'], // イ人
	MUNUS: ['め', 'Female personal name'], // め女
	URU: ['ち', 'City'], // ち市
	ID: ['つ', 'River'], // つ川
	D: ['ネ', 'Deity'] // ネ神
};

export function isDeterminer(token: string) {
	if (token.split(':')[0] in determiners) {
		return true;
	}
}

export function parseDeterminer(token: string) {
	const [determiner, value] = token.split(':');
	const [prefix, desc] = determiners[determiner as keyof typeof determiners];
	let transcription = pieTextToHangul(value);
	if (value.includes('-')) {
		let joined = value.split('-').join('');
		if (joined.includes('|')) {
			joined = joined.split('|')[0];
		}
		// remove duplicated vowels
		joined = joined.replace(/([aeiou])\1+/g, '$1');
		transcription = pieTextToHangul(joined);
	}
	return {
		id: 'DETERMINER',
		determiner: desc,
		determinerKey: determiner,
		char: prefix + transcription,
		phonetic: value
	};
}
