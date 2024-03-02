<script lang="ts">
	import { page } from '$app/stores';
	import TextView from '$lib/TextView.svelte';
	import { texts } from '../texts';
	import type { PageData } from './$types';

	export let data: PageData;
	let lexicon = data.lexicon;

	const { params } = $page;
	const title = params.title;

	const text = texts.find((t) => t.title === title);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{title}</h1>

{#if text}
	<aside>
		<a href={text.link} target="_blank"><cite>{text?.link}</cite></a>
	</aside>
	<br />
	<TextView {...text} {lexicon} />
{:else}
	<p>Text not found</p>
{/if}
