<script lang="ts">
	const SIZE = 9;

	type Path = {
		path: string;
	};
	export let path: Path[];
	export let height: number = 50;
	export let width: number = 50;
</script>

<svg
	viewBox={`-0.5 -0.5 ${SIZE} ${SIZE}`}
	style={`width: ${width}px; height: ${height}px;`}
	preserveAspectRatio="none"
>
	{#each path as p}
		<path
			d={p.path}
			fill="transparent"
			stroke="black"
			stroke-width="2px"
			stroke-linecap="round"
			stroke-linejoin="round"
			vector-effect="non-scaling-stroke"
		/>
	{/each}
</svg>
