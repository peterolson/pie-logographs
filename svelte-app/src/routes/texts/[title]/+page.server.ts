import { readLexiconFile } from '../../lexicon/download/readLexiconFile';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		lexicon: readLexiconFile()
	};
};
