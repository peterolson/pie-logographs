import type {
	AdjNounFormationType,
	Case,
	FormationType,
	Gender,
	GrammaticalNumber,
	Person,
	VerbType,
	Voice
} from './inflection';

export type Inflection = {
	[suffix: string]: {
		[pos: string]: Record<string, string>;
	};
};

export type LexiconEntry = {
	id?: string;
	PIE?: string;
	hittite?: string;
	char?: string;
	meanings?: string;
	character_hint?: string;
	pos?: string;
	references?: string[];
	inflections?: Record<string, Inflection>;
};

export type ParsedWord = {
	id: string;
	char?: string;
	prefix?: { id: string; char?: string }[];
	number?: GrammaticalNumber;
	gender?: Gender;
	case?: Case;
	adjNounFormation?: AdjNounFormationType;
	person?: Person;
	verbType?: VerbType;
	voice?: Voice;
	formation?: FormationType;
	suffixes?: string[];
	pos?: 'adj' | 'noun' | 'verb';
	gloss?: string;
	determiner?: string;
	determinerKey?: string;
	phonetic?: string;
};
