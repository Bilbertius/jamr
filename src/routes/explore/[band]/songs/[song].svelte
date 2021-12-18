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
    export let song;
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

    function play(url) {
        $playerStore.url = url;
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
                <button on:click={()=> $playerStore.url = jam.url} >Play</button>
            </span>
                <p>{jam.comments.length || 0} comments</p>
            </div>


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
    ul {


        list-style-type: none;
    }


    li {
        display:         flex;
        justify-content: space-between;
        align-items:    center;
        color:           hsl(210, 33%, 93%);
        margin:          10px auto;

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
</style>