<script>
    import { page } from '$app/stores';


    const { band } = $page.params;


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
    <slot></slot>
</section>
<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items:center;
        width: 95vw;
    }
    nav {
        display:        flex;
        flex-direction: column;

        width:          50%;
    }

    ul {
        margin-top:           100px;
        display:              flex;
        justify-content:      space-between;
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

    @media only screen and (max-width: 420px) {
        ul {
            margin-top: 40px;
        }
    }


</style>
