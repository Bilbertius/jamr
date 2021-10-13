<script context="module">
	export async function load({ fetch, page }) {

		let band = page.params.band;
		const res = await fetch(`/explore/${band}/shows.json`).then((res) => res.json())
		console.log(res);

			return {
				props: { band : res}
			};

	};
</script>

<script>
	import ShowHead from './_ShowHead.svelte';

	export let band;


</script>

<ul>
	{#each band.shows as show (show.id)}
		<ShowHead {show}/>
	{/each}
</ul>

<style>
	ul {
			list-style-type: none;
	}


</style>