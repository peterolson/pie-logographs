<script lang="ts">
	const SIZE = 9;
	export let path: string;
	export let height: number = 50;
	export let width: number = 50;
</script>

<svg
	viewBox={`0 0 ${SIZE * 10} ${SIZE * 10}`}
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
