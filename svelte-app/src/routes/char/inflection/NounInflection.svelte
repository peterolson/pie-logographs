<script lang="ts">
	import { adjNounFormations, cases, genders, numbers } from '$lib/inflection';

	export let cas: (typeof cases)[number];
	export let gen: (typeof genders)[number];
	export let num: (typeof numbers)[number];
	export let form: string = '';
	export let height: number = 32;

	const initials = {
		m: {
			sg: 'M 2 0 L 2 2',
			dual: 'M 1 0 L 1 2 M 3 2 L 3 0',
			pl: 'M 0 0 L 4 0 M 2 0 L 2 2'
		},
		f: {
			sg: 'M 0 0 Q 2 0 2 2 M 2 2 Q 2 0 4 0',
			dual: 'M 0 0 Q 1 0 1 2 M 1 2 Q 1 0 2 0 M 2 0 Q 3 0 3 2 M 3 2 Q 3 0 4 0',
			pl: 'M 0 0 Q 2 0 2 2 M 2 2 Q 2 0 4 0 M 0 0 L 4 0'
		},
		n: {
			sg: 'M 0 0 L 2 2 M 2 2 L 4 0',
			dual: 'M 0 0 L 1 2 M 1 2 L 2 0 M 2 0 L 3 2 M 3 2 L 4 0',
			pl: 'M 0 0 L 2 2 M 2 2 L 4 0 M 4 0 L 0 0'
		}
	};

	const cass = {
		nom: 'M 2 2 L 2 4',
		acc: 'M 0 2 L 4 2 M 2 2 L 2 4',
		gen: 'M 2 2 L 2 4 M 2 3 L 0 3 M 0 3 Q 1 3 2 2',
		dat: 'M 2 2 L 2 4 M 2 3 L 4 3 M 4 3 Q 3 3 2 2',
		ins: 'M 1 2 L 3 2 M 3 3 A 1 1 0 0 1 2 2 M 2 2 A 1 1 0 0 1 1 3 M 1 3 L 2 4 M 3 3 L 2 4',
		loc: 'M 0 2 L 4 2 M 1 2 L 2 4 M 2 4 L 3 2',
		voc: 'M 1 2 L 3 2 M 0 3 L 4 3 M 2 3 L 2 4',
		abl: 'M 0 2 L 4 2 M 2 4 A 1 2 0 0 1 1 2 M 3 2 A 1 2 0 0 1 2 4'
	};

	const forms = {
		'': '',
		_trom: 'M 2 4 L 0 5 M 2 4 L 4 5 M 4 5 L 2 8 M 0 5 L 2 8',
		_nos: 'M 2 4 L 2 5 M 2 5 A 1 1 0 0 1 3 6 M 3 6 A 1 1 0 0 1 2 7 M 2 7 L 2 8',
		_oo: 'M 2 4 Q 2 7 1 8 M 2 4 Q 2 6 3 8',
		_los: 'M 2 4 L 0 5 M 2 4 L 4 5 M 2 4 L 2 8',
		_us: 'M 2 4 L 1 5 M 2 4 L 3 5 M 1 5 L 1 8 M 3 5 L 3 8',
		_o_s: 'M 2 4 Q 2 7 1 8 M 2 4 Q 2 7 3 8 M 2 5 L 1 6 M 2 5 L 3 6',
		_os: 'M 2 4 L 0 6 M 0 6 L 0 8 M 0 8 L 4 8 M 4 8 L 4 6 M 4 6 L 2 4',
		_onts:
			'M 2 4 L 3 5 M 3 5 L 2 6 M 2 6 L 4 7 M 4 7 L 2 8 M 2 8 L 0 7 M 0 7 L 2 6 M 2 6 L 1 5 M 1 5 L 2 4',
		_r: 'M 0 8 Q 2 6 2 4 M 2 4 L 4 5 M 4 5 L 3 6 M 3 6 Q 3 7 4 8',
		_yo_s: 'M 0 4 L 2 5 M 2 5 L 4 4 M 2 5 L 2 8',
		_ryo_s: 'M 2 5 Q 2 7 0 8 M 0 4 L 2 5 M 2 5 L 4 4 M 2 5 L 4 6 M 4 6 L 3 7 M 3 7 Q 3 8 4 8',
		_ros: 'M 1 4 Q 4 4 4 8 M 2 4 Q 2 8 0 8',
		_es: 'M 2 4 A 1 1 0 0 1 3 5 M 3 5 A 1 1 0 0 1 2 6 M 2 8 A 1 1 0 0 1 1 7 M 1 7 A 1 1 0 0 1 2 6',
		_losus: 'M 2 4 L 0 5 M 2 4 L 4 5 M 1 5 L 1 8 M 3 5 L 3 8',
		_teros: 'M 2 4 L 4 5 M 4 5 L 0 5 M 4 6 L 0 6 M 0 6 L 2 7'
	};

	function findMinCoords(path: string) {
		let parts = path.split(' ');
		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;
		for (let i = 0; i < parts.length; i++) {
			if (parts[i] === 'M' || parts[i] === 'L') {
				i++;
				minX = Math.min(minX, +parts[i]);
				maxX = Math.max(maxX, +parts[i]);
				i++;
				minY = Math.min(minY, +parts[i]);
				maxY = Math.max(maxY, +parts[i]);
			} else if (parts[i] === 'Q') {
				i++;
				minX = Math.min(minX, +parts[i]);
				maxX = Math.max(maxX, +parts[i]);
				i++;
				minY = Math.min(minY, +parts[i]);
				maxY = Math.max(maxY, +parts[i]);
				i++;
				minX = Math.min(minX, +parts[i]);
				maxX = Math.max(maxX, +parts[i]);
				i++;
				minY = Math.min(minY, +parts[i]);
				maxY = Math.max(maxY, +parts[i]);
			} else if (parts[i] === 'A') {
				i++;
				minX = Math.min(minX, +parts[i]);
				maxX = Math.max(maxX, +parts[i]);
				i++;
				minY = Math.min(minY, +parts[i]);
				maxY = Math.max(maxY, +parts[i]);
				i += 3;
				minX = Math.min(minX, +parts[i]);
				maxX = Math.max(maxX, +parts[i]);
				i++;
				minY = Math.min(minY, +parts[i]);
				maxY = Math.max(maxY, +parts[i]);
			}
		}
		return [minX, minY, maxX, maxY];
	}

	let path = [initials[gen][num], cass[cas], forms[form as keyof typeof adjNounFormations]]
		.join(' ')
		.trim();

	const [minX, minY, maxX, maxY] = findMinCoords(path);
</script>

<svg
	viewBox={`${minX - 0.5} ${minY - 0.5} ${maxX + 1} ${maxY + 1}`}
	style={`width: ${height / 3}px; height: ${height}px; padding-left: 2px; padding-right: 2px;`}
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
