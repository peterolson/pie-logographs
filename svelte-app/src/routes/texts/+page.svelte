<script lang="ts">
	import { texts } from './texts';
</script>

<h1>Texts!</h1>
<ul>
	{#each texts as text}
		<li><a href="/texts/{text.title}">{text.title}</a></li>
	{/each}
</ul>
