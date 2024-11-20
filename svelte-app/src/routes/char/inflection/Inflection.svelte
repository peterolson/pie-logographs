<script lang="ts">
	import type { ParsedWord } from '$lib/lexicon.types';
	import NounInflection from './NounInflection.svelte';

	export let parsedWord: ParsedWord;
</script>

{#if parsedWord.pos === 'adj'}
	{#if (parsedWord.case ?? 'nom') === 'nom' && (parsedWord.gender ?? 'm') === 'm' && (parsedWord.number ?? 'sg') === 'sg' && !parsedWord.adjNounFormation}
		<span></span>
	{:else}
		<NounInflection
			cas={parsedWord.case || 'nom'}
			gen={parsedWord.gender || 'm'}
			num={parsedWord.number || 'sg'}
			form={parsedWord.adjNounFormation}
		/>
	{/if}
{/if}
