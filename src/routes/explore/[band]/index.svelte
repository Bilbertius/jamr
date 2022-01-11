<script context="module">
  // see https://kit.svelte.dev/docs#loading
  export const load = async ({ fetch , page}) =>   {
    //band is made available by the page since this route is named [band]
    const { band } = page.params;
    //fetches the index.json.js f
    const data = await fetch(`explore/${band}.json`).then((res) => res.json());

    return {
      props: { band : data }
    };
  }

</script>
<script>

  export let band;

</script>


<svelte:head>
  <title>{band.name}</title>
</svelte:head>

<section>

    <h1>{band.name}</h1>

<ul>

  {#each band.albums as album (album.id)}
    <li>{album.name}</li>
  {/each}
</ul>
</section>

<style>
  ul {
    list-style-type: none;
  }
  section {
      width: 90vw;
  }
</style>