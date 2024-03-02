const initialConsonants = {
	'': 'ᄋ',
	m: 'ᄆ',
	n: 'ᄂ',

	p: 'ᄑ',
	t: 'ᄐ',
	ḱ: 'ᄎ',
	k: 'ᄏ',
	kʷ: 'ᅀ',
	b: 'ᄇ',
	d: 'ᄃ',
	ǵ: 'ᄌ',
	g: 'ᄀ',
	gʷ: 'ᅌ',
	bʰ: 'ᄈ',
	dʰ: 'ᄄ',
	ǵʰ: 'ᄍ',
	gʰ: 'ᄁ',
	gʷʰ: 'ᅇ',
	s: 'ᄉ',
	H: 'ᄒ',
	h: 'ᄒ',
	'h₁': 'ᅙ',
	'h₂': 'ᄒ',
	'h₃': 'ᅘ',
	r: 'ᄅ',
	l: 'ᄅ', // I'm gonna tolerate some ambiguity here because ᄙ is fugly
	// combinations
	ng: 'ᄓ',
	nd: 'ᄕ',
	nb: 'ᄖ',
	ns: 'ᅛ',
	nǵ: 'ᅜ',
	nH: 'ᅝ',
	'nh₂': 'ᅝ',
	gd: 'ᅚ',
	dg: 'ᄗ',
	dr: 'ᅞ',
	tr: 'ᅞ',
	dm: 'ꥠ',
	db: 'ꥡ',
	ds: 'ꥢ',
	dǵ: 'ꥣ',
	rg: 'ꥤ',
	rgʰ: 'ꥥ',
	rn: 'ᄘ',
	rd: 'ꥦ',
	rdʰ: 'ꥧ'
};

const vowels = {
	'': 'ᅳ',
	a: 'ᅢ',
	e: 'ᅥ',
	o: 'ᅡ',
	ē: 'ᅦ',
	ō: 'ᅩ',
	i: 'ᅵ',
	u: 'ᅮ',
	y: 'ᅵ',
	w: 'ᅮ',
	ya: 'ᅤ',
	ye: 'ᅧ',
	yo: 'ᅣ',
	yē: 'ᅨ',
	yō: 'ᅭ',
	yi: 'ퟄ',
	yu: 'ᅲ',
	ia: 'ᅤ',
	ie: 'ᅧ',
	io: 'ᅣ',
	iē: 'ᅨ',
	iō: 'ᅭ',
	ii: 'ퟄ',
	iu: 'ᅲ',
	wa: 'ᅫ',
	we: 'ᅿ',
	wo: 'ᅪ',
	wē: 'ᆀ',
	wō: 'ᆂ',
	wi: 'ᅬ',
	wu: 'ᆃ',
	ua: 'ᅫ',
	ue: 'ᅿ',
	uo: 'ᅪ',
	uē: 'ᆀ',
	uō: 'ᆂ',
	ui: 'ᅬ',
	uu: 'ᆃ',
	ai: 'ힾ',
	ay: 'ힾ',
	ei: 'ힿ',
	ey: 'ힿ',
	oi: 'ᆘ',
	oy: 'ᆘ',
	ēi: 'ퟀ',
	ēy: 'ퟀ',
	ōi: 'ᆚ',
	ōy: 'ᆚ',
	iy: 'ퟄ',
	uy: 'ᅬ',
	au: 'ᆊ',
	aw: 'ᆊ',
	eu: 'ᅯ',
	ew: 'ᅯ',
	ou: 'ᆉ',
	ow: 'ᆉ',
	ēu: 'ᅰ',
	ēw: 'ᅰ',
	ōu: 'ힸ',
	ōw: 'ힸ',
	iw: 'ᅲ',
	uw: 'ᆃ'
};

const finals = {
	'': '',
	m: 'ᆷ',
	n: 'ᆫ',
	p: 'ᇁ',
	t: 'ᇀ',
	ḱ: 'ᆾ',
	k: 'ᆿ',
	kʷ: 'ᇫ',
	b: 'ᆸ',
	d: 'ᆮ',
	ǵ: 'ᆽ',
	g: 'ᆨ',
	gʷ: 'ᇰ',
	bʰ: 'ퟦ',
	dʰ: 'ퟍ',
	ǵʰ: 'ퟹ',
	gʰ: 'ᆩ',
	gʷʰ: 'ᇮ',
	s: 'ᆺ',
	H: 'ᇂ',
	h: 'ᇂ',
	'h₁': 'ᇹ',
	'h₂': 'ᇂ',
	'h₃': 'ퟶ',
	r: 'ᆯ',
	l: 'ᇐ'
};

const initialKeys = Object.keys(initialConsonants).sort((a, b) => b.length - a.length);
const vowelKeys = Object.keys(vowels).sort((a, b) => b.length - a.length);
const finalKeys = Object.keys(finals).sort((a, b) => b.length - a.length);

function match(text: string, keys: string[], map: Record<string, string>) {
	for (const key of keys) {
		if (text.startsWith(key)) {
			return [map[key], text.slice(key.length)];
		}
	}
	return ['', text];
}

function stripAccents(text: string) {
	return text
		.replaceAll('ó', 'o')
		.replaceAll('é', 'e')
		.replaceAll('á', 'a')
		.replaceAll('í', 'i')
		.replaceAll('ú', 'u')
		.replaceAll('ḗ', 'ē')
		.replaceAll('ṓ', 'ō');
}

export function pieTextToHangul(text: string): string {
	const [initial, rest] = match(text, initialKeys, initialConsonants);
	const [vowel, rest2] = match(stripAccents(rest), vowelKeys, vowels);
	const accent = '';
	// if (rest !== stripAccents(rest)) {
	// 	accent = '\u302e';
	// }
	const [final, rest3] = match(rest2, finalKeys, finals);
	if (rest3 === stripAccents(text)) {
		if (text === '') return text;
		return text[0] + pieTextToHangul(text.slice(1));
	}
	return initial + vowel + final + accent + pieTextToHangul(rest3);
}
