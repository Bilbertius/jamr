<script context='module'>
    // see https://kit.svelte.dev/docs#loading
    export const load = async ({ fetch, page }) => {
        //song is made available by the page since this route is named [song]
        const { band, jam } = page.params;
        //fetches the index.json.js f
        const data = await fetch(`/explore/${band}/shows/jams/${jam}.json`).then((res) => res.json());

        return {
            props: { jam: data }
        };
    };


</script>

<script>
    import Comments from './_Comments.svelte';
    export let jam;
</script>

<div>
    <h1>{jam.song.name} | {jam.show.info}</h1>
    <h4>Rating: {jam.votes.length}</h4>

    <Comments {jam} />
</div>

<style>
    h4  {
        color: white;
        font-size: 2rem;
    }
</style>