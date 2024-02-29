<script lang="ts">
	export let data: {
		references?: string[];
	};
</script>

{#each data.references || [] as href, i}
	{@const url = new URL(href)}
	{@const displayText = url.hostname.split('.').slice(-2).join('.')}
	{#if i > 0},
	{/if}
	<a {href} target="_blank">{displayText}</a>
{/each}
