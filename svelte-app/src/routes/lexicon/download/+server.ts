import { json } from '@sveltejs/kit';
import { readLexiconFile } from './readLexiconFile';

export async function GET() {
	const lexicon = readLexiconFile();
	return json(lexicon);
}
