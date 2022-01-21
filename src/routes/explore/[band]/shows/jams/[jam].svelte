<script context='module'>
    // see https://kit.svelte.dev/docs#loading
    export const load = async ({ fetch, page }) => {
        //jam is made available by the page since this route is named [jam]
        const { band, jam } = page.params;
        //fetches the [jam].json.js
        const data = await fetch(`/explore/${band}/shows/jams/${jam}.json`)
          .then((res) => res.json());

        return {
            props: { jam : data }
        };
    };


</script>

<script>

    import Comments from './_Comments.svelte';
    import Vote from './_Vote.svelte';
    import {playerStore} from '$lib/playerStore';
    import PlayButton from '$lib/PlayButton.svelte';
    import { vStore } from '$lib/voteStore';
   


    export let jam;
    let jamId = jam.id;
    let votes = jam.votes;

    $vStore = [...votes];







</script>
<svelte:head>
    <title>
        {jam.song.name} - {jam.show.info}
    </title>
</svelte:head>

<div>
    <h1>{jam.song.name} {jam.features ? jam.features : ''} <br /> {jam.show.info} </h1>

    <PlayButton {jam} />
  
    <Vote {votes} {jamId} />

    <Comments {jam} />
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


    @media only screen and (max-width: 420px) {
        h1 {
            font-size: 1.2rem;
        }
    }
    @media only screen and (max-width : 800px) {
        h1 {
            font-size: 1.2rem;
        }
    }
</style>