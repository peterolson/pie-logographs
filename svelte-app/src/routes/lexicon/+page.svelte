<script lang="ts">
	import { onMount } from 'svelte';
	import EntryEditorModal from './EntryEditorModal.svelte';
	import References from './References.svelte';
	import { createGrid, GridApi, type ICellRendererParams } from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-quartz.css';
	import { AbstractCellRenderer, cellRendererFactory } from '$lib/CellRenderer';
	import lexicon from '$lib/lexicon.json';
	import type { LexiconEntry } from '$lib/lexicon.types';

	let gridContainer: HTMLDivElement;
	let quickFilterText = '';
	let gridApi: GridApi;

	onMount(() => {
		gridApi = createGrid(gridContainer, {
			rowData: lexicon as LexiconEntry[],
			defaultColDef: { resizable: true, sortable: true, filter: true },
			columnDefs: [
				{ field: 'id', width: 150 },
				{ field: 'PIE', width: 150 },
				{ field: 'pos', width: 75 },
				{ field: 'char', width: 80 },
				{ field: 'meanings', flex: 1 },
				{ field: 'character_hint', headerName: 'Character Hint', flex: 1 },
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
							new EntryEditorModal({ target: c.eGui, props: { data: p.data } });
						}
					),
					width: 90
				}
			]
		});
	});
</script>

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
		height: calc(100svh - 64px);
		width: 100%;
		margin-top: 8px;
	}
</style>
