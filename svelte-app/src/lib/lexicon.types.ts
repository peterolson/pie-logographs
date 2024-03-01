import type {
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
	person?: Person;
	verbType?: VerbType;
	voice?: Voice;
	formation?: FormationType;
	suffixes?: string[];
	pos?: 'adj' | 'noun' | 'verb';
};
