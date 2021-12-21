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
    import Play from 'svelte-icons/fa/FaPlay.svelte';
    export let jam;
    let jamId = jam.id;

    let votes = jam.votes;

    function play() {
        $playerStore.url = jam.url;
        $playerStore.playing = jam.show.info;
        $playerStore.track = jam.song.name;
        $playerStore.isPlaying = true;
        console.log($playerStore);
    }

</script>

<div>
    <h1>{jam.song.name} <br /> {jam.show.info}</h1>

    <button on:click={() => play()}> <Play /> </button>
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
        padding :15px;
        width: 50px;
        border-radius: 50%;
        border: none;
        color: green;
        background-color: var(--text-color);
        font-size: 1.5rem;
        align-self: center;
    }

    @media only screen and (max-width: 420px) {
        h1 {
            font-size: 1.2rem;
        }
    }
    @media only screen and (max-width : 800px) {
        h1 {
            font-size: 1rem;
        }
    }
</style>