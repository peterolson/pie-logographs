<script lang="ts">
	import References from '../routes/lexicon/References.svelte';
	import { suffixes } from './inflection';
	import type { LexiconEntry, ParsedWord } from './lexicon.types';
	import { parse } from './parse';
	import { renderWord } from './render/renderWords';

	export let text: string;
	export let lexicon: LexiconEntry[];
	export let gloss: string;

	let selectedLanguage = 'default';

	const parsedText = parse(text, lexicon, gloss);

	let selectedWord: ParsedWord;

	function viewDetails(word: ParsedWord) {
		selectedWord = word;
	}
</script>

Read as: <select bind:value={selectedLanguage}>
	<option value="default">Default</option>
	<option value="pie">Proto-Indo-European</option>
</select>

{#each parsedText as line}
	<p class:cjk={selectedLanguage === 'default'}>
		{#each line as word, i}
			<a
				href="/lexicon/{word.id}"
				class:selected={selectedWord === word}
				on:click={(e) => {
					e.preventDefault();
					selectedWord = word;
				}}>{renderWord(word, line[i - 1], line[i + 1], selectedLanguage, lexicon)}</a
			>
		{/each}
	</p>
{/each}

{#if selectedWord}
	{@const lexiconEntry = lexicon.find((entry) => entry.id === selectedWord.id)}
	<div class="details">
		{selectedWord.gloss || ''}
		{selectedWord.id}
		{selectedWord.pos || ''}
		{#if lexiconEntry}
			{lexiconEntry.PIE}
			{lexiconEntry.char}
			{lexiconEntry.character_hint || ''}
			<References data={lexiconEntry} />
		{/if}
		{#each selectedWord.suffixes || [] as suffix}
			{@const suffixData = suffixes[suffix]}
			{#if suffixData}
				{suffixData.form}
				{suffixData.desc}
				{suffixData.link}
			{/if}
		{/each}
	</div>
{/if}

<style>
	p {
		margin: 0;
		min-height: 8px;
		font-size: 1.5em;
		font-style: normal;
	}

	p a:hover {
		background-color: #ffffba;
		cursor: pointer;
	}

	a {
		text-decoration: none;
		color: inherit;
		white-space: nowrap;
	}

	a.selected {
		background-color: #ffffba;
		text-decoration: underline;
	}

	p.cjk {
		font-family: 'Noto Sans KR', 'Noto Sans TC', sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
	}
</style>
