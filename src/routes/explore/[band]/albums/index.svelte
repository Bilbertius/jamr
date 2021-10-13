<script context="module">
	export async function load({ fetch, page }) {

		let band = page.params.band;
		const res = await fetch(`/explore/${band}/albums.json`).then((res) => res.json())


		return {
			props: { band : res}
		};

	};
</script>

<script>
	import AlbumHead from './_AlbumHead.svelte';
	export let band;
</script>

<ul>
	{#each band.albums as album (album.id)}
		<AlbumHead {album}/>
	{/each}
</ul>

<style>
    ul {
        list-style-type: none;
    }


</style>