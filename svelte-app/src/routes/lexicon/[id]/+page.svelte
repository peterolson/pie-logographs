<script lang="ts">
	import { page } from '$app/stores';

	const { params } = $page;
	const id = params.id;
</script>

<h1>{id}</h1>
