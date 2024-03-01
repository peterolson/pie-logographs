<script lang="ts">
	import type { LexiconEntry } from './lexicon.types';
	import { parse } from './parse';
	import { renderWord } from './render/renderWords';

	export let text: string;
	export let lexicon: LexiconEntry[];

	let selectedLanguage = 'default';

	const parsedText = parse(text, lexicon);
</script>

Read as: <select bind:value={selectedLanguage}>
	<option value="default">Default</option>
	<option value="pie">Proto-Indo-European</option>
</select>

{#each parsedText as line}
	<p class:cjk={selectedLanguage === 'default'}>
		{#each line as word, i}
			<span>{renderWord(word, line[i - 1], line[i + 1], selectedLanguage, lexicon)}</span>
		{/each}
	</p>
{/each}

<style>
	p {
		margin: 0;
		min-height: 8px;
		font-size: 1.5em;
		font-style: normal;
	}

	p span:hover {
		background-color: #ffffba;
		cursor: pointer;
	}

	p.cjk {
		font-family: 'Noto Sans KR', 'Noto Sans TC', sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
	}
</style>
