<script lang="ts">
	import SvgChar from './SVGChar.svelte';

	const SIZE = 9;

	type Stroke =
		| {
				type: 'line';
				fromX: number;
				fromY: number;
				toX: number;
				toY: number;
		  }
		| {
				type: 'quadratic';
				fromX: number;
				fromY: number;
				toX: number;
				toY: number;
				cx: number;
				cy: number;
		  }
		| {
				type: 'arc';
				fromX: number;
				fromY: number;
				toX: number;
				toY: number;
		  }
		| {
				type: 'transform';
				strokes: Stroke[];
				translateX: number;
				translateY: number;
				scaleX: number;
				scaleY: number;
				flipX: boolean;
				flipY: boolean;
				rotate: number;
		  };

	type Path = {
		path: string;
		transform?: {
			rotate?: number;
			scaleX?: number;
			scaleY?: number;
			translateX?: number;
			translateY?: number;
			flipX?: boolean;
			flipY?: boolean;
		};
		strokes: Stroke[];
	};

	function convertStrokesToSVGPath(strokes: Stroke[]) {
		const output: Path[] = [];
		for (const stroke of strokes) {
			if (stroke.type === 'line') {
				output.push({
					path: `M ${stroke.fromX} ${stroke.fromY} L ${stroke.toX} ${stroke.toY}`,
					strokes: [stroke]
				});
			} else if (stroke.type === 'quadratic') {
				output.push({
					path: `M ${stroke.fromX} ${stroke.fromY} Q ${stroke.cx} ${stroke.cy} ${stroke.toX} ${stroke.toY}`,
					strokes: [stroke]
				});
			} else if (stroke.type === 'arc') {
				const rx = Math.abs(stroke.toX - stroke.fromX);
				const ry = Math.abs(stroke.toY - stroke.fromY);
				const largeArcFlag = 0;
				const sweepFlag = 1;
				output.push({
					path: `M ${stroke.fromX} ${stroke.fromY} A ${rx} ${ry} 0 ${largeArcFlag} ${sweepFlag} ${stroke.toX} ${stroke.toY}`,
					strokes: [stroke]
				});
			}
		}
		return output;
	}

	let strokes: Stroke[] = [];
	let selectedStroke: Stroke | null = null;
	let prevX: number | null = null;
	let prevY: number | null = null;

	const clickPoint =
		(x: number, y: number, clickButton: 'left' | 'right' | 'center') => (e: MouseEvent) => {
			if (clickButton === 'center' && e.button !== 1) {
				return;
			}
			if (clickButton === 'right' && selectedStroke) {
				if (selectedStroke.type === 'line' || selectedStroke.type === 'quadratic') {
					const newStroke = { ...selectedStroke, type: 'quadratic', cx: x, cy: y } as Stroke;
					strokes = strokes.map((s) => (s === selectedStroke ? newStroke : s));
					selectedStroke = newStroke;
					return;
				}
			} else if (prevX !== null && prevY !== null) {
				if (clickButton === 'center') {
					strokes.push({
						type: 'arc',
						fromX: prevX,
						fromY: prevY,
						toX: x,
						toY: y
					});
				} else {
					strokes.push({ type: 'line', fromX: prevX, fromY: prevY, toX: x, toY: y });
				}
			}
			prevX = x;
			prevY = y;
			strokes = [...strokes];
			if (strokes.length) {
				selectedStroke = strokes[strokes.length - 1];
			}
		};
</script>

<div class="editor">
	<svg viewBox={`-0.5 -0.5 ${SIZE} ${SIZE}`} style="width: 400px;">
		{#each convertStrokesToSVGPath(strokes) as path, i}
			<path
				d={path.path}
				fill="transparent"
				stroke={selectedStroke && path.strokes.includes(selectedStroke) ? 'blue' : 'red'}
				stroke-width="0.3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		{/each}

		{#each Array.from({ length: SIZE * SIZE }, (_, i) => i) as i}
			{@const x = i % SIZE}
			{@const y = Math.floor(i / SIZE)}
			{@const clickHandler = clickPoint(x, y, 'left')}
			{@const rightClickHandler = clickPoint(x, y, 'right')}
			{@const centerClickHandler = clickPoint(x, y, 'center')}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<circle
				cx={x}
				cy={y}
				r="0.25"
				fill="yellow"
				on:click|stopPropagation={clickHandler}
				on:contextmenu|stopPropagation|preventDefault={rightClickHandler}
				on:auxclick|stopPropagation|preventDefault={centerClickHandler}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<text
				x={x - 0.15}
				y={y + 0.1}
				font-size="0.3"
				fill="black"
				on:click|stopPropagation={clickHandler}
				on:contextmenu|stopPropagation|preventDefault={rightClickHandler}
				on:auxclick|stopPropagation|preventDefault={centerClickHandler}>{x + 1}{y + 1}</text
			>
		{/each}
	</svg>

	<SvgChar path={convertStrokesToSVGPath(strokes)} />

	<SvgChar path={convertStrokesToSVGPath(strokes)} width={25} height={50} />
	<SvgChar path={convertStrokesToSVGPath(strokes)} width={50} height={25} />
</div>
<button
	on:click={() => {
		selectedStroke = null;
		prevX = null;
		prevY = null;
	}}>Deselect</button
>
<div class="strokes">
	{#each strokes as stroke}
		<div>
			{stroke.type}
			{#if stroke === selectedStroke}
				<i>Selected</i>
			{:else}
				<button
					on:click={() => {
						selectedStroke = stroke;
					}}>Select</button
				>
			{/if}
			<button
				on:click={() => {
					strokes = strokes.filter((s) => s !== stroke);
					if (selectedStroke === stroke) {
						selectedStroke = null;
					}
				}}
			>
				Delete
			</button>
			<pre>{JSON.stringify(stroke)}</pre>
		</div>
	{/each}
</div>

<style>
	div.editor {
		display: flex;
	}
</style>
