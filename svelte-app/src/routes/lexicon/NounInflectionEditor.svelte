<script lang="ts">
	import type { Case } from '$lib/inflection';
	import type { LexiconEntry, ParsedWord } from '$lib/lexicon.types';
	import { getNounInflection } from '$lib/render/renderWords';

	const cases: Case[] = ['nom', 'voc', 'acc', 'gen', 'abl', 'dat', 'loc', 'ins'] as const;
	const numbers = ['sg', 'dual', 'pl'] as const;

	export let lexiconEntry: LexiconEntry;
	export let nounInflections: Record<string, string>;
	export let lang: string;

	function autoFill() {
		for (const c of cases) {
			for (const n of numbers) {
				nounInflections[`${n} ${c}`] = getNounInflection(lexiconEntry, lang, n, c);
			}
		}
	}
</script>

<table>
	<thead>
		<tr>
			<th><button on:click={autoFill}>auto-fill</button></th>
			<th>Singular</th>
			<th>Dual</th>
			<th>Plural</th>
		</tr>
	</thead>
	<tbody>
		{#each cases as c}
			<tr>
				<th>{c}</th>
				<td><input bind:value={nounInflections['sg ' + c]} /></td>
				<td><input bind:value={nounInflections['dual ' + c]} /></td>
				<td><input bind:value={nounInflections['pl ' + c]} /></td>
			</tr>
		{/each}
	</tbody>
</table>
