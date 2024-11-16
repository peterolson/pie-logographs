<script lang="ts">
	const SIZE = 7;
	const letters = [...'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWX'].map((letter, i) => ({
		letter,
		x: (i % SIZE) * 10 + SIZE,
		y: Math.floor(i / SIZE) * 10 + SIZE
	}));
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

	export let path: string;
	export let fontSize = 32;
	export let hTrim = 1;
	export let vTrim = (() => {
		let max = 0;
		for (let i = 0; i < SIZE; i++) {
			for (let j = 0; j < SIZE; j++) {
				if (path.includes(letters[i * SIZE + j].letter)) {
					max = Math.max(max, (i + 1) / SIZE);
				}
			}
		}
		return max;
	})();
</script>

{#if path.trim()}
	<svg
		viewBox={`0 0 ${SIZE * 10 * hTrim} ${SIZE * 10 * vTrim}`}
		style={`width: ${fontSize * hTrim}px; height: ${fontSize}px`}
	>
		<path
			d={convertCodeToPath(path)}
			fill="transparent"
			stroke="black"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{/if}
