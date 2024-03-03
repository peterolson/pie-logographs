<script lang="ts">
	import type { LexiconEntry } from '$lib/lexicon.types';
	import { getLexicon } from '../../lib/lexicon';
	import InflectionEditor from './InflectionEditor.svelte';

	export let data: LexiconEntry;
	export let onSave: (lexicon: LexiconEntry[]) => void;
	export let close: () => void;
	let { id, PIE, hittite, char, pos, meanings, character_hint, references, inflections } = data;

	const partsOfSpeech = [
		'adj',
		'adv',
		'conj',
		'det',
		'det, pron',
		'intj',
		'noun',
		'num',
		'part',
		'part, root',
		'pron',
		'root',
		'verb',
		'punct'
	];

	let characterEntryIndex = -1;

	async function updateEntry(entry: Partial<LexiconEntry>) {
		const lexicon = await getLexicon();
		const updatedEntry = {
			...data,
			...entry
		};
		const res = await fetch(`/lexicon/update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				updatedEntry,
				characterEntryIndex,
				entryIndex: lexicon.findIndex((e) => e === data),
				lexicon
			})
		});
		const updatedLexicon = await res.json();
		onSave(updatedLexicon);
		close();
	}

	async function importCharacter() {
		const lexicon = await getLexicon();
		characterEntryIndex = lexicon.findIndex((e) => e.char === char && e.character_hint);
		const characterEntry = lexicon[characterEntryIndex];
		if (characterEntry.PIE) {
			characterEntryIndex = -1;
		}
		character_hint = characterEntry.character_hint;
		references = [
			...(references || []),
			...(characterEntry.references || []).filter((x) => x.includes('dong-chinese'))
		];
	}
</script>

<div class="input-grid">
	<span>ID</span>
	<input type="text" bind:value={id} />
	<span>PIE</span>
	<input type="text" bind:value={PIE} />
	<span>Hittite</span>
	<input type="text" bind:value={hittite} />
	<span>Character</span>
	<input type="text" bind:value={char} />
	<span>POS</span>
	<select bind:value={pos}>
		<option></option>
		{#each partsOfSpeech as part}
			<option value={part}>{part}</option>
		{/each}
	</select>
	<span>Meanings</span>
	<input type="text" bind:value={meanings} />
	<span>Character hint</span>
	<input type="text" bind:value={character_hint} />
	<span>References</span>
	<ul>
		{#each references || [] as href}
			{@const url = new URL(href)}
			{@const displayText = url.hostname.split('.').slice(-2).join('.')}
			<li><a {href} target="_blank">{displayText}</a></li>
		{/each}
	</ul>
</div>
<InflectionEditor bind:inflections lexiconEntry={data} />
<button
	on:click={() => {
		updateEntry({ id, PIE, hittite, char, pos, meanings, character_hint, references, inflections });
	}}>Save</button
>
{#if !character_hint && char}
	<button on:click={importCharacter}>Import character</button>
{/if}

<style>
	.input-grid {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 8px;
	}
</style>
