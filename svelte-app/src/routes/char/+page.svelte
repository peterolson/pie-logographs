<script lang="ts">
	import SvgChar from './SVGChar.svelte';

	const SIZE = 9;

	let pathCode = '';
	let words: string[] = [];

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

	let strokes: Stroke[] = [];
	let selectedStroke: Stroke | null = null;

	function convertStrokesToSVGPath(strokes: Stroke[]) {
		const output = [];
		for (const stroke of strokes) {
			const x = stroke.x * 10 + 5;
			const y = stroke.y * 10 + 5;
			if (stroke.type === 'move') {
				output.push(`M ${x} ${y}`);
			} else if (stroke.type === 'line') {
				output.push(`L ${x} ${y}`);
			} else if (stroke.type === 'quadratic') {
				const cx = stroke.cx * 10 + 5;
				const cy = stroke.cy * 10 + 5;
				output.push(`Q ${cx} ${cy} ${x} ${y}`);
			}
		}
		return output.join(' ');
	}

	function toDigit(char: string) {
		if (!/^[1-9]$/.test(char)) {
			return null;
		}
		return (+char - 1) * 10 + 5;
	}

	function convertCodeToPath(code: string) {
		code = ' ' + code;
		let output = [];
		for (let i = 1; i < code.length; i += 2) {
			const prevChar = code[i - 1];
			let x = code[i];
			let y = code[i + 1];
			const areCoords = /[1-9]/.test(x) && /[1-9]/.test(y);
			if (prevChar === ' ' && areCoords) {
				output.push(`M ${toDigit(x)} ${toDigit(y)}`);
			} else if (x === '-') {
				// 	// quadratic curve
				// 	if (i + 2 >= code.length) {
				// 		break;
				// 	}
				// 	const nextChar = code[i + 1];
				// 	const nextLetter = letters.find((l) => l.letter === nextChar);
				// 	if (!nextLetter) break;
				// 	const nextNextChar = code[i + 2];
				// 	const nextNextLetter = letters.find((l) => l.letter === nextNextChar);
				// 	if (!nextNextLetter) break;
				// 	output.push(`Q ${nextLetter.x} ${nextLetter.y} ${nextNextLetter.x} ${nextNextLetter.y}`);
				// 	x = nextNextLetter.x;
				// 	y = nextNextLetter.y;
				// 	i += 2;
				// } else if (x === '*') {
				// 	// circle around center
				// 	if (i + 1 >= code.length) {
				// 		break;
				// 	}
				// 	const nextChar = code[i + 1];
				// 	if (!nextChar) break;
				// 	const radius = +nextChar * 10;
				// 	output.push(`M ${x + radius} ${y}`);
				// 	output.push(`A ${radius} ${radius} 0 1 1 ${x - radius} ${y}`);
				// 	output.push(`A ${radius} ${radius} 0 1 1 ${x + radius} ${y}`);
				// 	i += 2;
			} else if (areCoords) {
				output.push(`L ${toDigit(x)} ${toDigit(y)}`);
			} else {
				i -= 1;
			}
		}
		return output.join(' ');
	}

	const clickPoint = (x: number, y: number, isRight: boolean) => () => {
		if (!selectedStroke) {
			strokes.push({ type: 'move', x, y });
		} else if (isRight && selectedStroke) {
			if (selectedStroke.type === 'line' || selectedStroke.type === 'quadratic') {
				const newStroke = { ...selectedStroke, type: 'quadratic', cx: x, cy: y } as Stroke;
				strokes = strokes.map((s) => (s === selectedStroke ? newStroke : s));
				selectedStroke = newStroke;
				return;
			}
		} else {
			strokes.push({ type: 'line', x, y });
		}
		strokes = [...strokes];
		if (strokes.length) {
			selectedStroke = strokes[strokes.length - 1];
		}
	};

	const MOVE = 'move' as const;
</script>

<form
	on:submit|preventDefault={() => {
		words = [...words, pathCode];
		pathCode = '';
	}}
>
	<input type="text" bind:value={pathCode} />
	<button type="submit">Add</button>
	<input
		type="reset"
		value="Reset"
		on:click={() => {
			pathCode = '';
			words = [];
		}}
	/>
</form>

<div>
	<svg viewBox={`0 0 ${SIZE * 10} ${SIZE * 10}`} style="width: 400px;">
		{#each strokes as stroke, i}
			{#if stroke.type !== 'move' && i > 0}
				{@const prevStroke = { type: MOVE, x: strokes[i - 1].x, y: strokes[i - 1].y }}
				<path
					d={convertStrokesToSVGPath([prevStroke, stroke])}
					fill="transparent"
					stroke={stroke === selectedStroke ? 'blue' : 'red'}
					stroke-width="4"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			{/if}
		{/each}

		{#each Array.from({ length: SIZE * SIZE }, (_, i) => i) as i}
			{@const x = i % SIZE}
			{@const y = Math.floor(i / SIZE)}
			{@const clickHandler = clickPoint(x, y, false)}
			{@const rightClickHandler = clickPoint(x, y, true)}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<circle
				cx={x * 10 + 5}
				cy={y * 10 + 5}
				r="2"
				fill="yellow"
				on:click|stopPropagation={clickHandler}
				on:contextmenu|stopPropagation|preventDefault={rightClickHandler}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<text
				x={x * 10 + 4}
				y={y * 10 + 6}
				font-size="3"
				fill="black"
				on:click|stopPropagation={clickHandler}
				on:contextmenu|stopPropagation|preventDefault={rightClickHandler}>{x + 1}{y + 1}</text
			>
		{/each}
	</svg>

	{#each words as word}
		<svg viewBox={`0 0 ${SIZE * 10} ${SIZE * 10}`} style="width: 50px;">
			<path
				d={convertCodeToPath(word)}
				fill="transparent"
				stroke="black"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{/each}
	<SvgChar path={convertStrokesToSVGPath(strokes)} />

	<SvgChar path={convertStrokesToSVGPath(strokes)} width={25} height={50} />
	<SvgChar path={convertStrokesToSVGPath(strokes)} width={50} height={25} />
</div>
<button
	on:click={() => {
		selectedStroke = null;
	}}
>
	New path
</button>
<button
	on:click={() => {
		strokes = strokes.slice(0, strokes.length - 1);
		selectedStroke = strokes[strokes.length - 1] || null;
	}}
>
	Remove last stroke
</button>
<button
	on:click={() => {
		strokes = [];
		selectedStroke = null;
	}}
>
	Clear
</button>
<button
	on:click={() => {
		if (!selectedStroke) return;
		const selectedIndex = strokes.indexOf(selectedStroke);
		if (selectedIndex <= 0) return;
		selectedStroke = strokes[selectedIndex - 1] || null;
	}}
>
	&lt;
</button>
<button
	on:click={() => {
		if (!selectedStroke) return;
		const selectedIndex = strokes.indexOf(selectedStroke);
		if (selectedIndex < 0 || selectedIndex + 1 >= strokes.length) return;
		selectedStroke = strokes[selectedIndex + 1] || null;
	}}
>
	&gt;
</button>

<style>
	div {
		display: flex;
	}
</style>
