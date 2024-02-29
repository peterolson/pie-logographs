<script lang="ts">
	import type { LexiconEntry } from '$lib/lexicon.types';

	export let data: LexiconEntry;
	let { PIE, char, pos, meanings, character_hint } = data;

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
		{#each data.references || [] as href}
			{@const url = new URL(href)}
			{@const displayText = url.hostname.split('.').slice(-2).join('.')}
			<li><a {href} target="_blank">{displayText}</a></li>
		{/each}
	</ul>
</div>

<style>
	.input-grid {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 8px;
	}
</style>
