<script context='module'>
    // see https://kit.svelte.dev/docs#loading
    export const load = async ({ fetch, page }) => {
        //song is made available by the page since this route is named [song]
        const { band, song } = page.params;
        //fetches the index.json.js f
        const data = await fetch(`/explore/${band}/songs/${song}.json`).then((res) => res.json());

        return {
            props: { song: data }
        };
    };


</script>

<script>

    import  Stars from './_Stars.svelte';
    import { playerStore } from '$lib/playerStore';
    import Play from 'svelte-icons/fa/FaPlay.svelte';
    export let song;
    let track = song.name;
    let jams =  song.jams;

    jams.forEach(jam => {
        let tally = 0;
        let len = jam.votes.length;
        let i;
        for (i = 0; i<len; i++) {
            tally += jam.votes[i].rating;
        }
        jam.stars = tally / len || 0;
    })
    jams.sort((a,b) => b.stars - a.stars);

    function play(jam) {
        $playerStore.url = jam.url;
        $playerStore.playing = jam.show.info;
        $playerStore.track = track;
        $playerStore.isPlaying = true;

    }

</script>


<svelte:head>
    <title>{song.name}</title>
</svelte:head>

<div class='songinfo'>
    <h1>
        {song.name}
    </h1>
    <h2>{song.album.name}</h2>
</div>

<h3>Played at {jams.length} shows </h3>

<ul>
    {#each jams as jam}
        <li>
            <div class='jaminfo'>

            <span>
                <a sveltekit:prefetch
                   href='/explore/{song.band.name}/shows/jams/{jam.id}'> {jam.show.info} </a>
                <button on:click={() => play(jam)} class='icon'><Play /></button>
            </span>
            </div>
                <p>{jam.comments.length || 0} comments</p>


            <Stars rating={jam.stars} />
        </li>
    {/each}
</ul>

<style>
    div.songinfo {
        display:        flex;
        flex-direction: column;
        align-items:    center;

    }

    div.jaminfo {
        display: flex;
        justify-content: space-between;
        width: 80%;
        align-items: center;
    }
    p {
        color: #7c7d7d;
    }
    a {
        width: 100%;
    }
    ul {


        list-style-type: none;
    }


    li {
        display:         flex;
        justify-content: space-between;
        align-items:    center;
        color:           hsl(210, 33%, 93%);
        margin:          0px auto;

    }
    h1 {
        color : hsl(210, 20%, 93%);
    }
    h3 {
        color : hsl(0, 10%, 60%);
    }

    h2 {
        font-size: 2.5ch;
        color:     hsl(0, 10%, 70%);
    }
    /* Smartphones (portrait) ———– */
    @media only screen
    and (max-width : 420px) {
       ul {
           width: 100%;
           padding-inline-start: 0;
       }
        li {
            display: flex;
            flex-direction: column;
            width: 100vw;
        }
    }
    .icon {
        background-color: inherit;
        border: none;
        color: green;
        height: 32px;
        width: 32px;
    }

    @media only screen and (max-width : 800px) {
        h1 {
            font-size: 1rem;
        }
    }
</style>