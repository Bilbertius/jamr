<script>
    import { page } from '$app/stores';


    const { band } = $page.params;
    import AudioPlayer from'$lib/_AudioPlayer.svelte';

</script>

<nav>
    <ul>
        <li class:active={$page.path === `/explore/${band}/shows`}>
            <a sveltekit:prefetch
               href='/explore/{band}/shows'>Shows
            </a>
        <li class:active={$page.path === `/explore/${band}/albums`}>
            <a sveltekit:prefetch
               href='/explore/{band}/albums'>Albums
            </a>
        </li>
    </ul>
</nav>
<section>
    <AudioPlayer />
    <slot></slot>
</section>
<style>
    section {
        display: flex;
        flex-direction: column;
        align-items:center;
        width: 80vw;
    }
    nav {
        display:        flex;
        flex-direction: column;

        width:          100%;
    }

    ul {
        margin-top:           100px;
        display:              flex;
        justify-content:      space-around;
        align-items:          flex-end;
        list-style-type:      none;
        padding-inline-start: 0;

    }

    li.active > a {
        color: white;
    }


    :global(h1) {

        color: white;

    }
</style>
