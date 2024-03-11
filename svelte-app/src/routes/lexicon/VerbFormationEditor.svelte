<script lang="ts">
	import {
		formationTypes,
		type Case,
		type Gender,
		type GrammaticalNumber,
		voices,
		verbTypes,
		numbers,
		persons
	} from '$lib/inflection';

	export let verbInflections: Record<string, string>;

	let selectedFormation = '_std';
	let selectedVoice = 'active';

	const verbTypeEntries = Object.entries(verbTypes).filter(([verbType]) => verbType !== 'part');
</script>

<div>
	Formation type: <select bind:value={selectedFormation}>
		{#each Object.entries(formationTypes) as [formationType, label]}
			<option value={formationType}>{label}</option>
		{/each}
	</select>
	Voice:
	<select bind:value={selectedVoice}>
		{#each voices as voice}
			<option value={voice}>{voice}</option>
		{/each}
	</select>
	<table>
		<thead>
			<tr>
				<th colspan="2">{selectedVoice}</th>
				{#each verbTypeEntries as [verbType, label]}
					<th>{label}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each numbers as n}
				{#each persons as person, i}
					<tr class:sg={n === 'sg'} class:dual={n === 'dual'} class:pl={n === 'pl'}>
						{#if i === 0}
							<th rowspan="3">{n}</th>
						{/if}
						<th>{person}</th>
						{#each verbTypeEntries as [verbType]}
							<td
								><input
									bind:value={verbInflections[
										`${selectedFormation} ${selectedVoice} ${verbType} ${n} ${person}`
									]}
								/></td
							>
						{/each}
					</tr>
				{/each}
			{/each}
			<tr>
				<th colspan="2">Participle</th>
				<td>
					<input bind:value={verbInflections[`${selectedFormation} ${selectedVoice} part sg 3`]} />
				</td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
	}
	input {
		width: 90%;
	}

	tbody th {
		padding-right: 4px;
	}

	.sg {
		background-color: #b6b6b6;
	}

	.dual {
		background-color: #e0e0e0;
	}

	.pl {
		background-color: #b6b6b6;
	}
</style>
