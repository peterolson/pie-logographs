<script lang="ts">
	import References from '../routes/lexicon/References.svelte';
	import { suffixes } from './inflection';
	import type { LexiconEntry, ParsedWord } from './lexicon.types';
	import { parse } from './parse';
	import { renderWord } from './render/renderWords';

	export let text: string;
	export let lexicon: LexiconEntry[];
	export let gloss: string;
	export let translation: string;

	let selectedLanguage = 'default';
	const parsedText = parse(text, lexicon, gloss, translation);

	let selectedWord: ParsedWord;
</script>

Read as: <select bind:value={selectedLanguage}>
	<option value="default">Default</option>
	<option value="pie">Proto-Indo-European</option>
	<option value="hittite">Hittite</option>
</select>

{#each parsedText as { words, translation }}
	<p class:cjk={selectedLanguage === 'default'} class:hittite={selectedLanguage === 'hittite'}>
		{#each words as word, i}
			<a
				href="/lexicon/{word.id}"
				class:selected={selectedWord === word}
				on:click={(e) => {
					e.preventDefault();
					selectedWord = word;
				}}
				><span
					>{renderWord(
						word,
						words[i - 1],
						words[i + 1],
						selectedLanguage,
						lexicon,
						'cuneiform'
					)}</span
				>{#if selectedLanguage === 'hittite'}<span class="transliteration"
						>{renderWord(
							word,
							words[i - 1],
							words[i + 1],
							selectedLanguage,
							lexicon,
							'latin'
						)}</span
					>{/if}</a
			>
		{/each}
	</p>
	<p class="translation">{translation}</p>
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

	@font-face {
		font-family: UllikummiA;
		src: url('/UllikummiA.ttf');
	}

	p.hittite {
		font-family: UllikummiA, sans-serif;
	}

	p.hittite a {
		display: inline-flex;
		flex-direction: column;
		text-align: center;
		padding-top: 8px;
	}

	.transliteration {
		font-size: 0.7em;
		opacity: 0.7;
		padding: 0px 2px;
		font-family: system-ui;
	}

	.translation {
		font-size: 0.8em;
		opacity: 0.7;
	}
</style>
