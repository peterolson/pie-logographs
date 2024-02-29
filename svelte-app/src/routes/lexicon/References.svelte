<script lang="ts">
	export let data: {
		references?: string[];
	};
</script>

{#each data.references || [] as href}
	{@const url = new URL(href)}
	{@const displayText = url.hostname.split('.').slice(-2).join('.')}
	<a {href} target="_blank">{displayText}</a>
{/each}
