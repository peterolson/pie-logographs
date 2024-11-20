<script lang="ts">
	import { adjNounFormations, cases, genders, numbers } from '$lib/inflection';
	import NounInflection from './NounInflection.svelte';
</script>

<h1>Adjective/Noun Inflection</h1>

{#each [['', 'Empty'], ...Object.entries(adjNounFormations)] as [key, value]}
	<h2>{key} {value}</h2>
	<table>
		<thead>
			<tr>
				<td></td>
				{#each genders as g}
					<td colspan={numbers.length}>{g}</td>
				{/each}
			</tr>
			<tr>
				<td>Case</td>
				{#each genders as g}
					{#each numbers as n}
						<td>{n.slice(0, 2)}</td>
					{/each}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each cases as c}
				<tr>
					<td>{c}</td>
					{#each genders as g}
						{#each numbers as n}
							<td><NounInflection cas={c} gen={g} num={n} form={key} /></td>
						{/each}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/each}

<style>
	table {
		border-collapse: collapse;
	}

	td {
		border: 1px solid black;
		padding: 4px;
		text-align: center;
	}
</style>
