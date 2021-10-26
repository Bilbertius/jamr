<script context='module'>
    // see https://kit.svelte.dev/docs#loading
    export const load = async ({ fetch, page }) => {
        //song is made available by the page since this route is named [song]
        const { band, song } = page.params;
        //fetches the index.json.js f
        const data = await fetch(`explore/${band}/songs/${song}.json`).then((res) => res.json());

        return {
            props: { song: data }
        };
    };


</script>

<script>
    export let song;
</script>


<svelte:head>
    <title>{song.name}</title>
</svelte:head>

<div>

    <h1>
        {song.name}
    </h1>
    <h2>{song.album.name}</h2>
</div>

<h3>Played at {song.jams.length} shows </h3>

<ul>
    {#each song.jams as jam}
        <li>
            <span>

                <a sveltekit:prefetch
                   href='/explore/{song.band.name}/shows/jams/{jam.id}'> {jam.show.info} </a>
            </span>
            <span>
                {jam.votes.length}
            </span>
        </li>
    {/each}
</ul>

<style>
    div {
        display:        flex;
        flex-direction: column;
        align-items:    center;

    }

    ul {


        list-style-type: none;
    }

    li {
        display:         flex;
        justify-content: space-between;
        color:           hsl(210, 33%, 93%);
        margin:          10px auto;

    }

    h2 {
        font-size: 2.5ch;
        color:     hsl(0, 10%, 100%);
    }
</style>