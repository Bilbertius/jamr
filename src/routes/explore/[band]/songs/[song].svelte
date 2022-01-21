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

    import Stars from './_Stars.svelte';
    import { playerStore } from '$lib/playerStore';
    
    import PlayButton from '$lib/PlayButton.svelte';

    export let song;
    let track = song.name;
    let jams = song.jams;

    jams.forEach(jam => {
        let tally = 0;
        let len = jam.votes.length;
        let i;
        for (i = 0; i < len; i++) {
            tally += jam.votes[i].rating;
        }
        jam.stars = tally / len || 0;
    });
    jams.sort((a, b) => b.stars - a.stars);





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
        <li class="jam">
            <div class='jaminfo'>

                <PlayButton {jam}/>
                <a sveltekit:prefetch
                   href='/explore/{song.band.name}/shows/jams/{jam.id}'> {jam.show.info} </a>


                <div>
                    <span>
                        <p>{jam.comments.length || 0}</p>
                        <p>comments</p>
                        <Stars rating={jam.stars}/>
                    </span>
                 
                </div>
                
              

            </div>

        </li>
    {/each}
</ul>

<style>
    div.songinfo {
        display:         flex;
        flex-direction:  column;
        justify-content: space-between;
        align-items:     center;

    }

    span {
        display:         flex;
        margin:          10px;
        justify-content: space-between;
        align-content: center;
    }

    div.jaminfo {
        display:         flex;
        justify-content: space-evenly;
        width:           100%;
        align-items:     center;
        height:          8.5vh;
    }

    p {
        display: flex;
        color:   #d6dbdb;
        margin:  auto 5px;

    }

    a {
        width: 100%;
        cursor: pointer;
    }

    ul {

        display:         flex;
        flex-direction:  column;
        align-items:     flex-start;
        justify-content: space-between;
        list-style-type: none;

    }

    .icon {
        background-color: inherit;
        border:           none;
        color:            green;
        height:           42px;
        width:            42px;
        margin-right:     15px;
    }


    li.jam {
        display:         flex;
        width:           100%;
        justify-content: space-between;
        align-items:     flex-start;
        color:           hsl(210, 33%, 93%);
        margin:          auto;

    }

    h1 {
        color: hsl(210, 20%, 93%);
        font-size: 2.4em;
    }

    h3 {
        color: hsl(0, 10%, 60%);
    }

    h2 {
        font-size: 2.5ch;
        color:     hsl(0, 10%, 70%);
    }

    /* Smartphones (portrait) ———– */
    @media only screen
    and (max-width: 420px) {
        ul {
            display:              flex;
            flex-flow:            column nowrap;
            width:                100%;
            padding-inline-start: 0;
        }

        div.jaminfo {
            height:          15vh;
            display:         flex;
            flex-flow:       column nowrap;
            align-items:     center;
            justify-content: center;
        }

        a {
            text-align: center;
            font-size:  15px;
        }

        p {
            display: none;
        }

        li {
            padding:        75px 35px 5px 35px;

            box-shadow:      0 2px 2px 2px hsla(210, 90%, 20%, 0.5), 0 -2px 2px 2px hsla(210, 90%, 90%, 0.5);
            display:         flex;
            flex-flow:       row wrap;
            justify-content: center;

            width:           calc(100vw - 82px);
            height:          20vh;

        }
    }


    .icon:hover {
        color: #3af73a
    }

    @media only screen and (max-width: 800px) {
        h1 {
            font-size: 1.2rem;
        }

        .icon {
            background-color: inherit;
            border:           none;
            color:            #baffba;
            height:           32px;
            width:            32px;
        }
    }
</style>