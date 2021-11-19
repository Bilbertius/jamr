<script context='module'>


    // see https://kit.svelte.dev/docs#loading
    export const load = async ({ fetch }) => {
        const res = await fetch('/explore.json');

        if (res.ok) {
            const bands = await res.json();

            return {
                props: { bands }
            };
        }

        const { message } = await res.json();

        return {
            error: new Error(message)
        };
    };

</script>

<script>
    import Protected from '$lib/Protected.svelte';
    import AuthForm from '$lib/AuthForm.svelte';
    import AddAlbum from './_AddAlbum.svelte';
    import AddSong from './_AddSong.svelte';
    import BandNav from './_BandNav.svelte';


    export let bands = [];
    let show = false;
    let bandShow = false;
    let id;

    function addSong(albumId) {
        id = albumId;
        show = true;

    }


</script>

<style>
    #explore {
        background-color: hsl(150, 0%, 25%);
        box-shadow:       5px 5px 22px 0 hsla(0, 0%, 10%, 0.7), -5px -5px 22px 0px hsla(0, 0%, 50%, 0.7), inset -2px -2px 8px 0px hsla(0, 0%, 10%, 0.7), inset 2px 2px 8px 0px hsla(0, 0%, 50%, 0.7);

        margin:           165px 20px;
        padding:          2vh 2vw;
        border-radius:    15px;

        width:            auto;
    }

    ul {
        list-style-type: none;

        color:           white;
        margin:          10px;
        padding:         5px;
        border-radius:   6%;
    }

    ul#song {
        list-style-type: none;
        color:           white;
        padding:         3px;

    }

    ul#song > li {
        box-shadow:    1px 1px 1px 1px hsla(0, 0%, 10%, 0.7), -1px -1px 1px 0px hsla(0, 0%, 50%, 0.7), inset 0px -1px 0px 0px hsla(0, 0%, 10%, 0.7), inset 0px 1px 0px 0px hsla(0, 0%, 40%, 0.7);
        margin:        3px auto;
        padding:       1px 5px;
        border-radius: 15px;

    }

    ul#song > li:hover {
        background-color: hsl(150, 0%, 30%);
    }

    ul#album {
        color: white;
    }

    li#album-li {
        display:         flex;
        align-items:     center;
        justify-content: flex-start;
    }

    p {
        color: #e3e6f1;

    }

    button {
        background-color: inherit;
        color:            white;
        border:           none;
        margin-left:      10px;
        border-radius:    50%;
        box-shadow:       3px 3px 1px 1px hsla(0, 0%, 10%, 0.7), -3px -3px 1px 0px hsla(0, 0%, 50%, 0.7), inset 0px -1px 0px 0px hsla(0, 0%, 10%, 0.7), inset 0px 1px 0px 0px hsla(0, 0%, 40%, 0.7);
    }

    button:active {
        box-shadow: inset 2px 2px 2px 2px hsla(176, 0%, 5%, 0.9), inset -2px -2px 2px 2px hsla(176, 0%, 54%, 0.9);
    }

    h4 {
        color:     hsl(176, 100%, 84%);
        font-size: 1.9ch;
    }


</style>


<svelte:head>
    <title>Explore</title>
</svelte:head>

<Protected>
    <AuthForm slot='unauthorized'/>
    <div id='explore'>
        <ul>
            {#each bands as band (band.id)}
                <h4>
                    <BandNav {band}/>
                </h4>
                <ul id='album'>
                    {#each band.albums as album }
                        <li id='album-li'>
                            <p>{album.name}</p>
                            <button type='button'
                                    on:click={()=> addSong(album.id)}>+
                            </button>
                            <AddSong {show}
                                     {id}
                                     albumId={album.id}
                                     bandId={album.bandId}/>
                        </li>
                        <ul id='song'>
                            {#each album.songs as song}
                                <li>
                                    <a sveltekit:prefetch
                                       href='explore/{band.name}/songs/{song.id}'>
                                        {song.name}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    {/each}
                </ul>
            {/each}
        </ul>
        <AddAlbum {bands}/>
    </div>
</Protected>
