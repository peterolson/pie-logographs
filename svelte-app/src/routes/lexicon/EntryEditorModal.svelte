<script lang="ts">
	import type { LexiconEntry } from '$lib/lexicon.types';
	import EntryEditor from './EntryEditor.svelte';

	export let data: LexiconEntry;

	let isOpen = false;
	let portalNode: HTMLDivElement;

	function open() {
		isOpen = true;
		queueMicrotask(() => {
			console.log('portalNode', portalNode);
			document.body.appendChild(portalNode);
		});
	}

	function close() {
		isOpen = false;
		// move the portal back to where it was
		document.body.removeChild(portalNode);
	}
</script>

<button on:click={open}>Edit</button>

{#if isOpen}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div bind:this={portalNode} class="portal" on:click={close}>
		<div class="modal" on:click={(e) => e.stopPropagation()}>
			<EntryEditor {data} />
			<button on:click={close}>Close</button>
		</div>
	</div>
{/if}

<style>
	.portal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}

	.modal {
		position: fixed;
		top: 10%;
		left: 10%;
		width: 80%;
		max-height: 80%;
		overflow: auto;
		background-color: white;
		padding: 1rem;
		border-radius: 5px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	}
</style>
