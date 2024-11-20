<script lang="ts">
	import type { ParsedWord } from '$lib/lexicon.types';
	import NounInflection from './NounInflection.svelte';
	import VerbInflection from './VerbInflection.svelte';

	export let parsedWord: ParsedWord;
</script>

{#if parsedWord.pos === 'adj' || parsedWord.pos === 'noun'}
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
{#if parsedWord.pos === 'verb'}
	{#if (parsedWord.number || 'sg') === 'sg' && (parsedWord.person || '3') === '3' && (parsedWord.verbType || 'sec') === 'sec' && (parsedWord.voice || 'active') === 'active' && (parsedWord.formation || '_std') === '_std'}
		<span></span>
	{:else}
		<VerbInflection
			num={parsedWord.number || 'sg'}
			per={parsedWord.person || '3'}
			typ={parsedWord.verbType || 'sec'}
			vce={parsedWord.voice || 'active'}
			form={parsedWord.formation || '_std'}
		/>
	{/if}
{/if}
