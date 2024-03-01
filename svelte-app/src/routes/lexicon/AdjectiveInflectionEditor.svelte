<script lang="ts">
	import type { Case, Gender, GrammaticalNumber } from '$lib/inflection';
	import type { LexiconEntry, ParsedWord } from '$lib/lexicon.types';

	const cases: Case[] = ['nom', 'voc', 'acc', 'gen', 'abl', 'dat', 'loc', 'ins'] as const;
	const genders: Gender[] = ['m', 'f', 'n'] as const;
	const numbers: GrammaticalNumber[] = ['sg', 'dual', 'pl'] as const;

	export let adjInflections: Record<string, string>;
</script>

<div>
	{#each genders as gen}
		<table>
			<thead>
				<tr>
					<th>{gen}</th>
					<th>Singular</th>
					<th>Dual</th>
					<th>Plural</th>
				</tr>
			</thead>
			<tbody>
				{#each cases as c}
					<tr>
						<th>{c}</th>
						<td><input bind:value={adjInflections[gen + ' sg ' + c]} /></td>
						<td><input bind:value={adjInflections[gen + ' dual ' + c]} /></td>
						<td><input bind:value={adjInflections[gen + ' pl ' + c]} /></td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/each}
</div>

<style>
	div {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
	input {
		width: 90%;
	}
</style>
