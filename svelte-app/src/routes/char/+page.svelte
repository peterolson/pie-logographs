<script lang="ts">
	import Character from './Character.svelte';
	import { checkLineIntersection } from './math';

	const hao = {
		strokes: [
			'M 330 202 Q 361 175 399 134 Q 415 119 424 118 Q 433 118 439 128 Q 446 138 442 170 Q 435 206 361 247 L 319 270 Q 292 286 258 304 Q 237 314 240 335 Q 261 393 281 453 L 293 492 Q 317 568 337 644 Q 347 690 366 715 Q 379 737 373 750 Q 360 769 313 797 Q 294 810 276 801 Q 263 794 273 778 Q 303 733 247 486 L 236 442 Q 218 373 195 336 Q 185 314 206 296 Q 254 268 294 233 L 330 202 Z',
			'M 294 233 Q 287 226 281 217 Q 250 180 196 143 Q 183 134 165 124 Q 149 114 133 104 Q 120 95 131 92 Q 212 86 327 199 Q 328 200 330 202 L 361 247 Q 406 322 421 385 Q 449 488 463 510 Q 473 526 458 537 Q 416 576 387 569 Q 374 565 378 550 Q 387 531 387 507 L 385 481 Q 384 469 382 455 Q 375 376 319 270 L 294 233 Z',
			'M 387 507 Q 341 501 293 492 L 247 486 Q 183 479 115 468 Q 94 465 61 471 Q 48 471 45 462 Q 41 450 49 441 Q 68 422 96 400 Q 106 396 118 402 Q 190 436 236 442 L 281 453 Q 320 463 362 474 Q 372 478 385 481 C 414 489 417 511 387 507 Z',
			'M 671 521 Q 788 635 822 648 Q 843 655 835 672 Q 831 688 760 725 Q 739 735 716 725 Q 661 703 575 676 Q 553 669 498 669 Q 473 669 482 648 Q 491 635 511 623 Q 544 605 578 627 Q 597 636 691 676 Q 706 682 719 673 Q 732 664 726 649 Q 693 595 655 531 C 640 505 649 500 671 521 Z',
			'M 717 430 Q 702 497 671 521 L 655 531 Q 648 535 640 538 Q 618 547 608 540 Q 595 533 608 519 Q 645 491 653 444 Q 656 434 659 421 L 668 384 Q 701 204 658 103 Q 643 76 607 83 Q 576 89 548 94 Q 536 97 542 85 Q 546 78 564 65 Q 604 31 618 5 Q 628 -14 645 -11 Q 660 -10 687 17 Q 775 107 726 391 L 717 430 Z',
			'M 726 391 Q 783 397 947 397 Q 966 398 971 406 Q 977 416 960 430 Q 909 467 848 454 Q 793 445 717 430 L 659 421 Q 562 409 452 393 Q 431 392 447 375 Q 460 362 478 357 Q 497 351 514 356 Q 586 375 668 384 L 726 391 Z'
		],
		medians: [
			[
				[282, 788],
				[307, 769],
				[327, 733],
				[264, 465],
				[216, 321],
				[235, 298],
				[386, 194],
				[411, 166],
				[424, 133]
			],
			[
				[390, 556],
				[417, 530],
				[424, 516],
				[422, 504],
				[387, 361],
				[338, 255],
				[304, 207],
				[260, 165],
				[206, 127],
				[137, 97]
			],
			[
				[59, 457],
				[107, 434],
				[373, 491],
				[380, 501]
			],
			[
				[493, 656],
				[517, 646],
				[550, 644],
				[680, 692],
				[706, 699],
				[743, 696],
				[771, 669],
				[765, 657],
				[677, 546],
				[674, 535],
				[663, 536]
			],
			[
				[613, 530],
				[637, 519],
				[659, 499],
				[674, 474],
				[687, 432],
				[711, 289],
				[709, 166],
				[692, 92],
				[672, 59],
				[648, 41],
				[551, 85]
			],
			[
				[449, 384],
				[504, 377],
				[860, 427],
				[906, 426],
				[960, 412]
			]
		],
		radStrokes: [0, 1, 2]
	};

	const L = {
		strokes: ['M 100 100 L 800 100 L 800 200 L 200 200 L 200 800 L 100 800 L 100 100 Z'],
		medians: [
			[
				[150, 800],
				[150, 750],
				[150, 150],
				[750, 150],
				[800, 150]
			]
		]
	};

	const L2 = {
		strokes: ['M 100 25 L 800 25 L 800 125 L 200 125 L 200 425 L 100 425 L 100 25 Z'],
		medians: [
			[
				[150, 375], // Start of the vertical median scaled
				[150, 75], // End of the vertical median (and start of the horizontal median) scaled
				[750, 75] // End of the horizontal median scaled
			]
		]
	};

	function scaleStrokeVertically(scale: number, path: string, medians: number[][]) {
		const scaledMedians = medians.map(([x, y]) => [x, y * scale]);
		const parsedPath: { type: string; points: [number, number][] }[] = [];
		const words = path.split(' ');
		let currentType = '';
		let currentPoints: [number, number][] = [];
		for (let i = 0; i < words.length; i++) {
			const word = words[i];
			if (word === 'M' || word === 'Q' || word === 'L' || word === 'Z') {
				if (currentPoints.length > 0) {
					parsedPath.push({ type: currentType, points: currentPoints });
				}
				currentType = word;
				currentPoints = [];
			} else {
				const x = parseFloat(words[i]);
				const y = parseFloat(words[i + 1]);
				currentPoints.push([x, y]);
				i++;
			}
		}

		function scalePoint(x: number, y: number) {
			//return [x, y / 2];
			const medianDistances = medians
				.map(([mx, my], i) => ({
					distance: Math.sqrt((x - mx) ** 2 + (y - my) ** 2),
					index: i,
					median: [mx, my],
					scaledMedian: [mx, my * scale]
				}))
				.sort((a, b) => a.distance - b.distance);
			const closestA = medianDistances[0];
			const closestB = medianDistances[1];

			const aToBDirection = [
				closestB.median[0] - closestA.median[0],
				closestB.median[1] - closestA.median[1]
			];
			const aToBPerpendicular = [-aToBDirection[1], aToBDirection[0]];

			const interection = checkLineIntersection(
				closestA.scaledMedian[0],
				closestA.scaledMedian[1],
				closestB.scaledMedian[0],
				closestB.scaledMedian[1],
				x,
				y,
				x + aToBPerpendicular[0],
				y + aToBPerpendicular[1]
			);

			if (!interection.x || !interection.y) {
				return [x, y * scale];
			}
			const xDiff = x - interection.x;
			const yDiff = y - interection.y;

			const scaledIntersect = [interection.x, interection.y * scale];

			return [scaledIntersect[0] + xDiff, scaledIntersect[1] + yDiff];
		}

		const scaledPath = parsedPath
			.map(({ type, points }) => {
				if (type === 'M' || type === 'L') {
					const [x, y] = scalePoint(points[0][0], points[0][1]);
					return `${type} ${x} ${y}`;
				} else if (type === 'Q') {
					const [x1, y1] = scalePoint(points[0][0], points[0][1]);
					const [x2, y2] = scalePoint(points[1][0], points[1][1]);
					return `L ${x2} ${y2}`;
				} else if (type === 'Z') {
					return 'Z';
				}
			})
			.join(' ');

		return {
			path: scaledPath,
			medians: scaledMedians
		};
	}

	const scaledHao = scaleStrokeVertically(0.5, L.strokes[0], L.medians[0]);

	const chars = ['好', '羊', '닥', '馬', '그', '⿰王真', '大'];
</script>

<br /><br />
<div>
	{#each chars as char}
		<Character {char} />
	{/each}
</div>
<br />
<svg viewBox="0 0 1024 1024" style="width: 400px;">
	<g transform="scale(1, -1) translate(0, -900)">
		{#each hao.strokes as stroke}
			<path d={stroke} />
		{/each}
	</g>
</svg>

<svg viewBox="0 0 1024 1024" style="width: 400px;">
	<g transform="scale(1, -1) translate(0, -900)">
		<path d={L.strokes[0]} />
		{#each L.medians[0] as median}
			<circle cx={median[0]} cy={median[1]} r="10" fill="red" />
		{/each}
	</g>
</svg>

<svg viewBox="0 0 1024 1024" style="width: 400px;">
	<g transform="scale(1, -1) translate(0, -900)">
		<path d={L2.strokes[0]} />
		{#each L2.medians[0] as median}
			<circle cx={median[0]} cy={median[1]} r="10" fill="red" />
		{/each}
	</g>
</svg>

<svg viewBox="0 0 1024 1024" style="width: 400px;">
	<g transform="scale(1, -1) translate(0, -900)">
		<path d={scaledHao.path} />
		{#each scaledHao.medians as median}
			<circle cx={median[0]} cy={median[1]} r="10" fill="red" />
		{/each}
	</g>
</svg>
