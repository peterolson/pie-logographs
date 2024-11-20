<script lang="ts">
	import { verbTypes, formationTypes, numbers, voices, persons } from '$lib/inflection';
	import { findMinCoords } from './inflectionUtils';

	export let num: (typeof numbers)[number];
	export let per: (typeof persons)[number];
	export let typ: string;
	export let vce: (typeof voices)[number];
	export let form: string = '_std';
	export let height: number = 32;

	const initials = {
		'1': {
			sg: 'M 2 0 L 2 2 M 2 1 L 0 1',
			dual: 'M 2 0 L 2 2 M 2 1 L 0 1 M 2 0 L 0 0',
			pl: 'M 0 0 L 2 0 M 2 0 L 2 2'
		},
		'2': {
			sg: 'M 2 0 L 2 2 M 2 1 L 4 1',
			dual: 'M 2 0 L 2 2 M 2 1 L 4 1 M 2 0 L 4 0',
			pl: 'M 2 2 L 2 0 M 2 0 L 4 0'
		},
		'3': {
			sg: 'M 2 0 L 2 2',
			dual: 'M 0 0 L 0 2 M 2 0 L 2 2',
			pl: 'M 0 0 L 4 0 M 2 0 L 2 2'
		}
	};

	const vces = {
		active: '',
		middle: 'M 0 2 L 4 2',
		stative: 'M 4 0 L 4 2 M 4 2 L 0 2'
	};

	const types = {
		prim: 'M 2 2 L 1 3 M 1 3 L 2 4 M 2 4 L 3 3 M 3 3 L 2 2',
		sec: 'M 2 2 L 2 4',
		subj: 'M 2 2 L 2 4 M 4 2 L 2 4 M 0 2 L 2 4',
		opt: 'M 2 2 L 0 3 M 2 2 L 4 3 M 2 3 L 4 4 M 2 3 L 0 4 M 2 3 L 2 4',
		imp: 'M 2 2 L 2 3 M 0 3 L 4 3 M 1 4 L 3 4',
		part: 'M 2 2 L 2 3 M 2 3 A 2 1 0 0 1 4 4 M 0 4 A 2 1 0 0 1 2 3 M 2 3 L 2 4'
	};

	const forms = {
		_std: '',
		_dup: 'M 2 4 L 2 5 M 2 5 L 4 5 M 0 5 L 2 5 M 2 5 L 2 6 M 2 6 L 4 6 M 2 6 L 0 6',
		_yeti: 'M 2 4 L 2 6 M 2 6 L 0 8 M 2 6 L 4 8',
		_newti: 'M 2 4 L 2 8 M 1 5 L 3 5 M 0 7 L 4 7',
		_ye_ti:
			'M 2 4 L 2 5 M 2 5 A 1 1 0 0 1 3 6 M 3 6 A 1 1 0 0 1 2 7 M 2 7 A 1 1 0 0 1 1 6 M 1 6 A 1 1 0 0 1 2 5'
	};

	let path = [
		initials[per][num],
		vces[vce],
		types[typ as keyof typeof verbTypes],
		forms[form as keyof typeof formationTypes]
	]
		.join(' ')
		.trim();

	let [minX, minY, maxX, maxY] = findMinCoords(path);
</script>

<svg
	viewBox={`${minX - 0.5} ${-0.5} ${maxX + 1} ${maxY + 1}`}
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
