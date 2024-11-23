<script lang="ts">
	import Character from '../routes/char/Character.svelte';
	import Inflection from '../routes/char/inflection/Inflection.svelte';
	import PathChar from '../routes/char/PathChar.svelte';
	import SvgChar from '../routes/char/SVGChar.svelte';
	import References from '../routes/lexicon/References.svelte';
	import { addInflection, addSuffixes, suffixes } from './inflection';
	import type { LexiconEntry, ParsedWord } from './lexicon.types';
	import { parse } from './parse';
	import { renderWord } from './render/renderWords';

	export let text: string;
	export let lexicon: LexiconEntry[];
	export let gloss: string;
	export let translation: string;
	export let lang: string;

	let selectedLanguage = 'default';
	let showTranslation = true;
	let showTransliteration = true;
	const parsedText = parse(text, lexicon, gloss, translation, lang);

	let selectedWord: ParsedWord;
</script>

Read as: <select bind:value={selectedLanguage}>
	<option value="default">Default</option>
	<option value="pie">Proto-Indo-European</option>
	<option value="hittite">Hittite</option>
	<option value="chinese">Chinese</option>
</select>
<label>
	<input type="checkbox" bind:checked={showTranslation} />
	Show translation
</label>
{#if selectedLanguage === 'hittite'}
	<label>
		<input type="checkbox" bind:checked={showTransliteration} />
		Show transliteration
	</label>
{/if}
<br /><br />
{#each parsedText as { words, translation }}
	<p class:cjk={selectedLanguage === 'chinese'} class:hittite={selectedLanguage === 'hittite'}>
		{#each words as word, i}
			{@const renderedWord = renderWord(
				word,
				words[i - 1],
				words[i + 1],
				selectedLanguage,
				lexicon,
				'cuneiform'
			)}
			<a
				href="/lexicon/{word.id}"
				class:selected={selectedWord === word}
				on:click={(e) => {
					e.preventDefault();
					selectedWord = word;
				}}
				>{#if selectedLanguage === 'default'}<SvgChar path={word.path || ''} /><Inflection
						parsedWord={word}
					/>{:else}<span>{renderedWord}</span
					>{/if}{#if selectedLanguage === 'hittite' && showTransliteration}<span
						class="transliteration"
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
	{#if showTranslation}
		<p class="translation">{translation}</p>
	{/if}
{/each}

{#if selectedWord}
	{@const lexiconEntry = lexicon.find((entry) => entry.id === selectedWord.id)}
	<div class="details">
		{selectedWord.gloss || ''}
		{selectedWord.id}
		{selectedWord.pos || ''}
		{#if lexiconEntry}
			{lexiconEntry.PIE}
			<SvgChar path={lexiconEntry.path || ''} />
			{lexiconEntry.character_hint || ''}
			<References data={lexiconEntry} />
		{/if}
		{selectedWord.pos || ''}
		{selectedWord.person || ''}
		{selectedWord.gender || ''}
		{selectedWord.number || ''}
		{selectedWord.case || ''}
		{selectedWord.adjNounFormation || ''}
		{selectedWord.voice || ''}
		{selectedWord.verbType || ''}
		{selectedWord.formation || ''}

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
		margin-bottom: 8px;
	}
</style>
