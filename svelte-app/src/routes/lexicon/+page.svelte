<script lang="ts">
	import { onMount } from 'svelte';
	import EntryEditorModal from './EntryEditorModal.svelte';
	import References from './References.svelte';
	import { createGrid, GridApi, type ICellRendererParams } from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-quartz.css';
	import { AbstractCellRenderer, cellRendererFactory } from '$lib/CellRenderer';
	import '../../lib/lexicon';
	import type { LexiconEntry } from '$lib/lexicon.types';
	import { getLexicon, updateLexicon } from '../../lib/lexicon';
	import PathChar from '../char/PathChar.svelte';
	import SvgChar from '../char/SVGChar.svelte';

	let gridContainer: HTMLDivElement;
	let quickFilterText = '';
	let gridApi: GridApi;

	function onSave(lexicon: LexiconEntry[]) {
		updateLexicon(lexicon);
		gridApi.setGridOption('rowData', lexicon);
	}

	function comparator(
		a: string | undefined,
		b: string | undefined,
		nodeA: unknown,
		nodeB: unknown,
		isInverted: boolean
	) {
		if (a === b) return 0;
		if (!a) {
			return isInverted ? -1 : 1;
		}
		if (!b) {
			return isInverted ? 1 : -1;
		}
		return a.localeCompare(b);
	}

	onMount(async () => {
		const lexicon = await getLexicon();
		gridApi = createGrid(gridContainer, {
			rowData: lexicon as LexiconEntry[],
			defaultColDef: { resizable: true, sortable: true, filter: true },
			columnDefs: [
				{ field: 'id', width: 150, comparator },
				{ field: 'PIE', width: 150, comparator },
				{ field: 'pos', width: 75, comparator },
				{
					field: 'path',
					headerName: 'Char',
					width: 80,
					comparator,
					cellRenderer: cellRendererFactory(
						(c: AbstractCellRenderer, p: ICellRendererParams<any, any, any>) => {
							new SvgChar({ target: c.eGui, props: { path: p.data.path || '' } });
						}
					)
				},
				{ field: 'meanings', flex: 1, comparator },
				{ field: 'character_hint', headerName: 'Character Hint', flex: 1, comparator },
				{
					field: 'references',
					cellRenderer: cellRendererFactory(
						(c: AbstractCellRenderer, p: ICellRendererParams<any, any, any>) => {
							new References({ target: c.eGui, props: { data: p.data } });
						}
					)
				},
				{
					headerName: 'Tools',
					cellRenderer: cellRendererFactory(
						(c: AbstractCellRenderer, p: ICellRendererParams<any, any, any>) => {
							new EntryEditorModal({ target: c.eGui, props: { data: p.data, onSave } });
						}
					),
					width: 90
				}
			]
		});
	});
</script>

<svelte:head>
	<title>Lexicon</title>
</svelte:head>
<label
	>Search:
	<input
		type="text"
		bind:value={quickFilterText}
		on:input={(e) => {
			gridApi.updateGridOptions({ quickFilterText });
		}}
	/>
</label>
<div bind:this={gridContainer} id="lexicon-grid" class="ag-theme-quartz"></div>

<style>
	#lexicon-grid {
		height: calc(100svh - 80px);
		width: 100%;
		margin-top: 8px;
	}
</style>
