<script lang="ts">
	const SIZE = 7;
	const letters = [...'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWX'].map((letter, i) => ({
		letter,
		x: (i % SIZE) * 10 + SIZE,
		y: Math.floor(i / SIZE) * 10 + SIZE
	}));

	let pathCode = '';
	let words: string[] = [];

	function convertCodeToPath(code: string) {
		code = ' ' + code;
		let output = [];
		for (let i = 0; i < code.length; i++) {
			const char = code[i];
			const prevChar = code[i - 1];
			const letter = letters.find((l) => l.letter === char);
			if (prevChar === ' ' && letter) {
				output.push(`M ${letter.x} ${letter.y}`);
			} else if (char === '-') {
				// smooth curve
				if (i + 2 >= code.length) {
					break;
				}
				const nextChar = code[i + 1];
				const nextLetter = letters.find((l) => l.letter === nextChar);
				if (!nextLetter) break;
				const nextNextChar = code[i + 2];
				const nextNextLetter = letters.find((l) => l.letter === nextNextChar);
				if (!nextNextLetter) break;
				output.push(`S ${nextLetter.x} ${nextLetter.y} ${nextNextLetter.x} ${nextNextLetter.y}`);
				i += 2;
			} else if (letter) {
				output.push(`L ${letter.x} ${letter.y}`);
			}
		}
		return output.join(' ');
	}
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
		<path
			d={convertCodeToPath(pathCode)}
			fill="transparent"
			stroke="red"
			stroke-width="4"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		{#each Array.from({ length: SIZE * SIZE }, (_, i) => i) as i}
			<circle
				cx={((i * 10) % (SIZE * 10)) + SIZE}
				cy={Math.floor(i / SIZE) * 10 + SIZE}
				r="1"
				fill="yellow"
			/>
			<text
				x={((i * 10) % (SIZE * 10)) + SIZE - 1}
				y={Math.floor(i / SIZE) * 10 + SIZE + 1}
				font-size="3"
				fill="black">{letters[i].letter}</text
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
	<svg viewBox={`0 0 ${SIZE * 10} ${SIZE * 10}`} style="width: 50px;">
		<path
			d={convertCodeToPath(pathCode)}
			fill="transparent"
			stroke="black"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</div>

<style>
	div {
		display: flex;
	}
</style>
