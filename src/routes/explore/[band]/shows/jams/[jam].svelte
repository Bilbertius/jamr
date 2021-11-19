<script context='module'>
    // see https://kit.svelte.dev/docs#loading
    export const load = async ({ fetch, page }) => {
        //song is made available by the page since this route is named [song]
        const { band, jam } = page.params;
        //fetches the index.json.js f
        const data = await fetch(`/explore/${band}/shows/jams/${jam}.json`)
          .then((res) => res.json());

        return {
            props: { jam: data }
        };
    };


</script>

<script>

    import Comments from './_Comments.svelte';
    import Vote from './_Vote.svelte';
    export let jam;
    let jamId = jam.id;
    let rate = 3;
    let votes = jam.votes;

</script>

<div>
    <h1>{jam.song.name} | {jam.show.info}</h1>
    <Vote {votes} {jamId} />

    <Comments {jam} />
</div>

<style>
    h1  {
        color: white;
        font-size: 2rem;
    }
    div {
        display: flex;
        flex-flow: column nowrap;
    }
</style>