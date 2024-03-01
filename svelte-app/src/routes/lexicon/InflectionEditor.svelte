<script lang="ts">
	import type { Inflection, LexiconEntry } from '$lib/lexicon.types';
	import AdjectiveInflectionEditor from './AdjectiveInflectionEditor.svelte';
	import NounInflectionEditor from './NounInflectionEditor.svelte';
	import VerbFormationEditor from './VerbFormationEditor.svelte';

	export let inflections: Record<string, Inflection> | undefined;
	export let lexiconEntry: LexiconEntry;

	const languages: Record<string, string> = {
		pie: 'Proto-Indo-European'
	};
	const pos: Record<string, string> = {
		noun: 'Noun',
		adj: 'Adjective',
		verb: 'Verb'
	};

	let selectedLanguage = 'pie';
	let selectedPOS = 'noun';
	let suffix = '';

	function addInflection(selectedLanguage: string, selectedPOS: string, suffix: string) {
		console.log('addInflection', inflections, selectedLanguage, selectedPOS, suffix);
		if (!inflections) {
			inflections = {};
		}
		if (!inflections[selectedLanguage]) {
			inflections[selectedLanguage] = {};
		}
		const languageInflections = inflections[selectedLanguage];
		if (!languageInflections[suffix]) {
			languageInflections[suffix] = {};
		}
		const suffixInflections = languageInflections[suffix];
		suffixInflections[selectedPOS] = suffixInflections[selectedPOS] || {};
		inflections = inflections;
	}

	const removeLang = (lang: string) => () => {
		if (inflections) {
			delete inflections[lang];
		}
		inflections = inflections;
	};
	const removeSuffix = (lang: string, suffix: string) => () => {
		if (inflections) {
			delete inflections[lang][suffix];
		}
		inflections = inflections;
	};
	const removePOS = (lang: string, suffix: string, pos: string) => () => {
		if (inflections) {
			delete inflections[lang][suffix][pos];
		}
		inflections = inflections;
	};
</script>

<div>
	{#if inflections}
		{#each Object.keys(inflections) as lang}
			<h3>{languages[lang]} <button on:click={removeLang(lang)}>Remove</button></h3>
			{#each Object.keys(inflections[lang]) as suffix}
				<h4>-{suffix} <button on:click={removeSuffix(lang, suffix)}>Remove</button></h4>
				{#each Object.keys(inflections[lang][suffix]) as pos}
					<h5>{pos} <button on:click={removePOS(lang, suffix, pos)}>Remove</button></h5>
					{#if pos === 'noun'}
						<NounInflectionEditor
							bind:nounInflections={inflections[lang][suffix][pos]}
							{lexiconEntry}
							{lang}
						/>
					{/if}
					{#if pos === 'adj'}
						<AdjectiveInflectionEditor bind:adjInflections={inflections[lang][suffix][pos]} />
					{/if}
					{#if pos === 'verb'}
						<VerbFormationEditor bind:verbInflections={inflections[lang][suffix][pos]} />
					{/if}
				{/each}
			{/each}
		{/each}
	{/if}
	New
	<select bind:value={selectedLanguage}>
		{#each Object.keys(languages) as lang}
			<option value={lang}>{languages[lang]}</option>
		{/each}
	</select>
	<select bind:value={selectedPOS}>
		{#each Object.keys(pos) as p}
			<option value={p}>{pos[p]}</option>
		{/each}
	</select>
	inflection with suffix <input type="text" bind:value={suffix} />
	<button on:click={() => addInflection(selectedLanguage, selectedPOS, suffix)}>Add</button>
</div>
