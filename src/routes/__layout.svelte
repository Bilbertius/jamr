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
    import AudioControls from '$lib/_AudioControls.svelte';
</script>



<Header/>

<main>
    <slot/>

</main>
<AudioControls />
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
        align-items: center;
        padding-bottom: 3rem;
        width:          calc(100vw - 15px);
        min-height:     calc(100vh - 15rem);

        margin:         0 auto;
        box-sizing:     border-box;
    }
    Header, footer {
        flex-shrink: 0;
    }

    footer {
        position: relative;
        bottom: 0;
        height: 3rem;
        width: calc(100vw - 15px);
        display:         flex;
        flex-direction:  row;
        justify-content: center;
        align-items:     center;

    }
    footer p {
        color: #d0dde9;
    }

    footer a {
        font-weight: bold;
    }

    @media (max-width: 480px) {
        main {
            padding: 0.2em;
        }
    }

    @media only screen and (max-width: 420px) {
        footer {
            height: 2rem;
        }
        main {
            min-height: calc(100vh - 10rem);

        }
    }
</style>
