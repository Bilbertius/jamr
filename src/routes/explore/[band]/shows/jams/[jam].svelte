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





    function play() {
        $playerStore.url = jam.url;
        $playerStore.playing = jam.show.info;
        $playerStore.track = jam.song.name;
        $playerStore.isPlaying = true;
    }


</script>
<svelte:head>
    <title>
        {jam.song.name} - {jam.show.info}
    </title>
</svelte:head>

<div>
    <h1>{jam.song.name} {jam.features} <br /> {jam.show.info} </h1>

    <PlayButton {jam} on:playsong/>
  
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
    button {
        padding :         15px;
        width:            50px;
        border-radius:    50%;
        border:           none;
        color:            #7ee07e;
        background-color: inherit;
        font-size:        1rem;
        align-self:       center;
    }

    button:hover {
        color: #159515;
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