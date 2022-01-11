<script context="module">
	export async function load({ fetch, page }) {

		let band = page.params.band;
		const res = await fetch(`/explore/${band}/shows.json`).then((res) => res.json())

			return {
				props: { band : res}
			};

	};
</script>

<script>
	import ShowHead from './_ShowHead.svelte';


	export let band;
    let shows = [...band.shows];
    shows = shows.sort((a,b) => b.date = a. date);
    let sorted = [...shows];
    console.log(sorted);

</script>

<ul>
	{#each sorted as show (show.id)}
		<ShowHead {show} band={band.name}/>
	{/each}
</ul>

<style>
	ul {
        list-style-type: none;
	}


</style>