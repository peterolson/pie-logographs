<script lang="ts">
	import strokeData from '$lib/strokeData.json';
	export let char: string;
	export let fontSize = 32;

	const strokeDict = Object.fromEntries(
		Object.entries(strokeData).map(([key, value]) => [key, value.strokes])
	);
</script>

{#if char.includes(' ')}
	{#each char.split(' ') as c}
		<svelte:self char={c} {fontSize} />
	{/each}
{:else if char in strokeData}
	<span
		class="svg-char"
		style={`width: ${fontSize}px; height: ${fontSize}px; font-size: ${fontSize - 3}px;`}
	>
		{char}<svg viewBox="0 0 1024 1024" style={`width: ${fontSize}px; height: ${fontSize}px`}>
			<g transform="scale(1, -1) translate(0, -900)">
				{#each strokeDict[char] as stroke}
					<path d={stroke} />
				{/each}
			</g>
		</svg>
	</span>
{:else}
	<span class="fallback" style={`font-size: ${fontSize * 0.8}px;`}>
		{char}
	</span>
{/if}

<style>
	span {
		display: inline-block;
		margin-top: 4px;
	}
	.fallback {
		font-family: 'Nanum Myeongjo', serif;
		font-style: normal;
		transform: translateY(-26%);
	}

	.svg-char {
		overflow: hidden;
		color: transparent;
		position: relative;
	}

	span::selection {
		background-color: #4fbeff;
		color: black;
	}

	.svg-char svg {
		position: absolute;
		top: 0;
		left: 0;
	}

	.svg-char::selection {
		color: transparent;
	}
</style>
