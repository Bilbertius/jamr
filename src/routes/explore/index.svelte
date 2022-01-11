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


    import BandNav from './_BandNav.svelte';


    export let bands = [];
    let show = false;
    let bandShow = false;
    let id;



</script>

<style>
    #explore {
        background-color: hsl(150, 0%, 25%);
        box-shadow:       3px 3px 3px 0 hsla(0, 0%, 10%, 0.7), -3px -3px 3px 0px hsla(0, 0%, 50%, 0.7), inset -2px
                          -2px 8px 0px hsla(0, 0%, 10%, 0.7), inset 2px 2px 8px 0px hsla(0, 0%, 50%, 0.7);

        margin:           165px 20px;
        padding:          2vh 2vw;
        border-radius:    15px;

        min-width:        min(100%,  50vh);


    }


    ul {
        list-style-type: none;

        color:           white;
        margin:          5px;
        padding:         5px;
        border-radius:   6%;
    }

    ul#song {
        list-style-type: none;
        color:           white;
        padding:         3px;

    }

    ul#song > a > li {
        box-shadow:    1px 1px 1px 1px hsla(0, 0%, 10%, 0.7), -1px -1px 1px 0px hsla(0, 0%, 50%, 0.7), inset 0px -1px 0px 0px hsla(0, 0%, 10%, 0.7), inset 0px 1px 0px 0px hsla(0, 0%, 40%, 0.7);
        margin:        6px auto;
        padding:       1px 5px;
        border-radius: 15px;

    }


    ul#song > a > li:hover {
        background-color:  hsla(210, 90%, 60%, 0.7);
        color: purple;
        box-shadow:    1px 1px 1px 1px hsla(210, 60%, 10%, 0.9), -1px -1px 1px 0px hsla(210, 70%, 70%, 0.9), inset 0px -1px 0px 0px hsla(210, 60%, 70%, 0.9), inset 0px 1px 0px 0px hsla(210, 60%, 10%, 0.9);
        text-decoration: none;
    }
     ul#song > a {
         text-decoration: none;
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

    

    h4 {
        color:     hsl(176, 100%, 84%);
        font-size: 1.9ch;
    }

   @media only screen and (max-width: 420px) {

       #explore {
           background-color: inherit;
           box-shadow:  none;
       }
       ul#song > a > li  {
            font-size: .8rem;
       }
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
                        </li>
                        <ul id='song'>
                            {#each album.songs as song}
                               
                                    <a sveltekit:prefetch
                                       href='explore/{band.name}/songs/{song.id}'>
                                       <li class="jam">
                                        {song.name}
                                </li>
                            </a>
                            {/each}
                        </ul>
                    {/each}
                </ul>
            {/each}
        </ul>

    </div>
</Protected>
