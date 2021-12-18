<script context='module'>
    import { store as authStore } from '$lib/auth';


    export async function load({ fetch }) {
        const res = await fetch('/api/auth/user');
        const { user } = await res.json();
        authStore.set({
            loading: false,
            user
        });
        return {
            status: 200,
            context: {
                user
            }
        };
    }
</script>
<script>
    import Header from '$lib/header/Header.svelte';
    import '../app.css';
    import AudioPlayer from '$lib/_AudioPlayer.svelte';
</script>



<Header/>

<main>
    <slot/>
<AudioPlayer />
</main>
<footer>
    <p>Made by
        <a href='https://will-macneil.now.sh'> Will</a>
    </p>
</footer>


<style>

    main {
        flex:           1;

        display:        flex;
        flex-direction: column;
        padding-bottom:        3rem;
        width:          100vw;
        min-height:     calc(100vh - 3em);
        max-width:      1024px;
        margin:         0 auto;
        box-sizing:     border-box;
    }
    Header, main, footer {
        flex-shrink: 0;
    }

    footer {
        position: relative;
        bottom: 0;
        height: 3rem;
        width: calc(100vw);
        display:         flex;
        flex-direction:  row;
        justify-content: center;
        align-items:     center;

    }

    footer a {
        font-weight: bold;
    }

    @media (max-width: 480px) {
        main {
            padding: 0.2em;
        }
    }
</style>
