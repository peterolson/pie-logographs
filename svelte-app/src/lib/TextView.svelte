<script lang="ts">
	import { pieTextToHangul } from './hangul';
	import { addInflection, addSuffixes } from './inflection';
	import type { LexiconEntry } from './lexicon.types';
	import { parse } from './parse';

	export let text: string;
	export let lexicon: LexiconEntry[];

	const parsedText = parse(text, lexicon);
	console.log(parsedText);
</script>

{#each parsedText as line}
	<p>
		{#each line as word}
			{word.char}{addSuffixes(word)}{addInflection(word)}
		{/each}
	</p>
{/each}

<style>
	p {
		margin: 0;
		min-height: 8px;
		font-size: 2em;
	}
</style>
