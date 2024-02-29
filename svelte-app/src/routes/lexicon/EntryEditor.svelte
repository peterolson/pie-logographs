<script lang="ts">
	import type { LexiconEntry } from '$lib/lexicon.types';
	import { getLexicon } from './lexiconStore';

	export let data: LexiconEntry;
	export let onSave: (lexicon: LexiconEntry[]) => void;
	export let close: () => void;
	let { PIE, char, pos, meanings, character_hint, references } = data;

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
		'verb'
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
		character_hint = characterEntry.character_hint;
		references = [...(references || []), ...(characterEntry.references || [])];
	}
</script>

<h2>Entry editor!</h2>
<div class="input-grid">
	<span>PIE</span>
	<input type="text" bind:value={PIE} />
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
<button
	on:click={() => {
		updateEntry({ PIE, char, pos, meanings, character_hint, references });
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