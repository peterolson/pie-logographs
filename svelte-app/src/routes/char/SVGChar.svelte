<script lang="ts">
	import { getLexicon } from '$lib/lexicon';

	const SIZE = 9;

	export let path: string;
	export let height: number = 32;
	export let width: number = 32;
</script>

{#if path && '，。！？；：（）…'.includes(path)}
	<span style={`font-size: ${height}px`}>
		{path}
	</span>
{:else if path && path.includes('|')}
	{@const parts = path.split('|')}
	{#each parts as part}
		<svelte:self path={part} {height} {width} />
	{/each}
{:else if path.startsWith('{') && path.endsWith('}')}
	{#await getLexicon() then lexicon}
		{@const lexiconEntry = lexicon.find((entry) => entry.id === path.slice(1, -1))}
		{#if lexiconEntry}
			<svelte:self path={lexiconEntry.path || ''} {height} {width} />
		{/if}
	{/await}
{:else}
	<svg
		viewBox={`-0.5 -0.5 ${SIZE} ${SIZE}`}
		style={`width: ${width}px; height: ${height}px;padding-left:2px;`}
		preserveAspectRatio="none"
	>
		{#if path}
			<path
				d={path}
				fill="transparent"
				stroke="black"
				stroke-width="2px"
				stroke-linecap="round"
				stroke-linejoin="round"
				vector-effect="non-scaling-stroke"
			/>
		{:else}
			<rect x="0" y="0" width={SIZE} height={SIZE} fill="red" />
		{/if}
	</svg>
{/if}
