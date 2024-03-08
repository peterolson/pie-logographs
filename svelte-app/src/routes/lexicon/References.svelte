<script lang="ts">
	export let data: {
		references?: string[];
	};
</script>

{#each data.references || [] as href, i}
	{#if i > 0},
	{/if}
	{#if href.includes('http')}
		{@const url = new URL(href)}
		{@const displayText = url.hostname.split('.').slice(-2).join('.')}

		<a {href} target="_blank">{displayText}</a>
	{:else}
		{href}
	{/if}
{/each}
