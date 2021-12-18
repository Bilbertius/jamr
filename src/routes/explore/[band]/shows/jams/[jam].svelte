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
    import {playerStore} from '$lib/playerStore';

    export let jam;
    let jamId = jam.id;

    let votes = jam.votes;

    function play() {
        $playerStore.url = jam.url;
    }

</script>

<div>
    <h1>{jam.song.name} | {jam.show.info}</h1>

    <Vote {votes} {jamId} />

    <Comments {jam} />
    <button on:click={() => play()}>Play</button>
</div>

<style>
    audio {
        background-color: aquamarine;
        width: 80%
    }
    h1  {
        color: white;
        font-size: 2rem;
    }
    div {
        display: flex;
        flex-flow: column nowrap;
    }
</style>