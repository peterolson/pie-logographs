<script lang="ts">
	const SIZE = 9;

	export let path: string;
	export let height: number = 50;
	export let width: number = 50;
</script>

<svg
	viewBox={`-0.5 -0.5 ${SIZE} ${SIZE}`}
	style={`width: ${width}px; height: ${height}px;`}
	preserveAspectRatio="none"
>
	<path
		d={path}
		fill="transparent"
		stroke="black"
		stroke-width="2px"
		stroke-linecap="round"
		stroke-linejoin="round"
		vector-effect="non-scaling-stroke"
	/>
</svg>
