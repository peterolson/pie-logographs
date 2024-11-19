<script lang="ts">
	import { getLexicon } from '$lib/lexicon';
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
				transformation: Transformation;
		  };

	type Transformation = {
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
			} else if (stroke.type === 'transform') {
				const transformedStrokes = stroke.strokes
					.map((s) => transformStroke(s, stroke.transformation))
					.flat();
				const path = convertStrokesToSVGPath(transformedStrokes)
					.map((p) => p.path)
					.join(' ');
				output.push({
					path,
					strokes: [...stroke.strokes]
				});
			}
		}
		return output;
	}

	function convertSVGPathToStrokes(path: string): Stroke[] {
		const output: Stroke[] = [];
		const parts = path.split(' ');
		let fromX = 0;
		let fromY = 0;
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			if (part === 'M') {
				fromX = +parts[++i];
				fromY = +parts[++i];
			}
			if (part === 'L') {
				const toX = +parts[++i];
				const toY = +parts[++i];
				output.push({ type: 'line', fromX, fromY, toX, toY });
				fromX = toX;
				fromY = toY;
			}
			if (part === 'Q') {
				const cx = +parts[++i];
				const cy = +parts[++i];
				const toX = +parts[++i];
				const toY = +parts[++i];
				output.push({ type: 'quadratic', fromX, fromY, toX, toY, cx, cy });
				fromX = toX;
				fromY = toY;
			}
			if (part === 'A') {
				i += 5;
				const toX = +parts[++i];
				const toY = +parts[++i];
				output.push({ type: 'arc', fromX, fromY, toX, toY });
				fromX = toX;
				fromY = toY;
			}
		}
		return output;
	}

	function transformStroke(stroke: Stroke, transformation: Transformation): Stroke[] {
		console.log(stroke, transformation);
		function transform(x: number, y: number) {
			let newX = x;
			let newY = y;
			if (transformation.flipX) {
				newX = SIZE - x;
			}
			if (transformation.flipY) {
				newY = SIZE - y;
			}
			newX -= Math.floor(SIZE / 2);
			newY -= Math.floor(SIZE / 2);
			const angle = (transformation.rotate * Math.PI) / 180;
			const cos = Math.cos(angle);
			const sin = Math.sin(angle);
			[newX, newY] = [cos * newX - sin * newY, sin * newX + cos * newY];
			newX += Math.floor(SIZE / 2);
			newY += Math.floor(SIZE / 2);
			newX = newX * transformation.scaleX + transformation.translateX;
			newY = newY * transformation.scaleY + transformation.translateY;
			return [newX, newY];
		}
		if (stroke.type === 'line') {
			const [fromX, fromY] = transform(stroke.fromX, stroke.fromY);
			const [toX, toY] = transform(stroke.toX, stroke.toY);
			return [{ ...stroke, fromX, fromY, toX, toY }];
		}
		if (stroke.type === 'quadratic') {
			const [fromX, fromY] = transform(stroke.fromX, stroke.fromY);
			const [toX, toY] = transform(stroke.toX, stroke.toY);
			const [cx, cy] = transform(stroke.cx, stroke.cy);
			return [{ ...stroke, fromX, fromY, toX, toY, cx, cy }];
		}
		if (stroke.type === 'arc') {
			const [fromX, fromY] = transform(stroke.fromX, stroke.fromY);
			const [toX, toY] = transform(stroke.toX, stroke.toY);
			return [{ ...stroke, fromX, fromY, toX, toY }];
		}
		return stroke.strokes.map((s) => transformStroke(s, transformation)).flat();
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

	let groupedStrokes: Stroke[] = [];

	let referenceURL = '';
</script>

<textarea
	value={convertStrokesToSVGPath(strokes)
		.map((x) => x.path)
		.join(' ')}
/>
<input type="text" bind:value={referenceURL} />
<div class="editor">
	<svg
		viewBox={`-0.5 -0.5 ${SIZE} ${SIZE}`}
		style={`width: 400px; background-image: url(${referenceURL})`}
	>
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

	<SvgChar
		path={convertStrokesToSVGPath(strokes)
			.map((x) => x.path)
			.join(' ')}
	/>

	<SvgChar
		path={convertStrokesToSVGPath(strokes)
			.map((x) => x.path)
			.join(' ')}
		width={25}
		height={50}
	/>
	<SvgChar
		path={convertStrokesToSVGPath(strokes)
			.map((x) => x.path)
			.join(' ')}
		width={50}
		height={25}
	/>

	<div class="lexicon">
		{#await getLexicon() then lexicon}
			{#each lexicon as entry}
				{#if entry.path}
					<button
						title={entry.id}
						on:click={() => {
							if (entry.path) {
								strokes = strokes.concat(convertSVGPathToStrokes(entry.path));
							}
						}}
					>
						<SvgChar path={entry.path} />
					</button>
				{/if}
			{/each}
		{/await}
	</div>
</div>
<button
	on:click={() => {
		selectedStroke = null;
		prevX = null;
		prevY = null;
	}}>Deselect</button
>
<button
	on:click={() => {
		strokes = [];
		selectedStroke = null;
		prevX = null;
		prevY = null;
	}}>Clear</button
>
{#if groupedStrokes.length > 0}
	<button
		on:click={() => {
			strokes = strokes
				.filter((s) => !groupedStrokes.includes(s))
				.concat({
					type: 'transform',
					strokes: groupedStrokes,
					transformation: {
						translateX: 0,
						translateY: 0,
						scaleX: 1,
						scaleY: 1,
						flipX: false,
						flipY: false,
						rotate: 0
					}
				});
			groupedStrokes = [];
			selectedStroke = null;
			prevX = null;
			prevY = null;
		}}
	>
		Group
	</button>
{/if}
<div class="strokes">
	{#each strokes as stroke}
		<div>
			<input type="checkbox" value={stroke} bind:group={groupedStrokes} />
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
					selectedStroke = null;
					prevX = null;
					prevY = null;
				}}
			>
				Delete
			</button>
			{#if stroke.type === 'line'}
				<button
					on:click={() => {
						strokes = strokes.map((s) =>
							s === stroke
								? {
										...s,
										type: 'arc'
									}
								: s
						);
					}}>Make arc</button
				>
			{/if}
			<pre>{JSON.stringify(stroke)}</pre>
			{#if stroke.type === 'transform'}
				<div class="transformations">
					<label
						>TranslateX
						<input type="number" step="0.5" bind:value={stroke.transformation.translateX} />
					</label>
					<label
						>TranslateY
						<input type="number" step="0.5" bind:value={stroke.transformation.translateY} />
					</label>
					<label
						>ScaleX
						<input type="number" step="0.1" bind:value={stroke.transformation.scaleX} />
					</label>
					<label
						>ScaleY
						<input type="number" step="0.1" bind:value={stroke.transformation.scaleY} />
					</label>
					<label
						>FlipX
						<input type="checkbox" bind:checked={stroke.transformation.flipX} />
					</label>
					<label
						>FlipY
						<input type="checkbox" bind:checked={stroke.transformation.flipY} />
					</label>
					<label
						>Rotate
						<input type="number" step="15" bind:value={stroke.transformation.rotate} />
					</label>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	div.editor {
		display: flex;
	}

	div.editor svg {
		background-size: cover;
	}

	div.transformations {
		display: flex;
		flex-direction: column;
	}

	.lexicon {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
	}

	.lexicon button {
		height: 50px;
	}
</style>
