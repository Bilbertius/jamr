<script>
    import { page } from '$app/stores';

    import { store as authStore, logout } from '../auth.js';


    $:auth = $authStore;

    function handleLogout() {
        logout();
    }

</script>


<header>


    <nav>
        <svg viewBox='0 0 2 3'
             aria-hidden='true'>
            <path d='M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z'/>
        </svg>
        <ul>
            <li class:active={$page.path === '/'}>
                <a sveltekit:prefetch
                   href='/'>Home
                </a>
            </li>
            <li class:active={$page.path === '/explore'}>
                <a sveltekit:prefetch
                   href='/explore'>Explore
                </a>
            </li>


            {#if auth && auth.user }
                <li class:active={$page.path === `/${auth.user.email}`}>
                    <a sveltekit:prefetch
                       href='/{auth.user.email}'>
                        Profile
                    </a>
                </li>
                <li class:active={$page.path === '/auth'}>
                    <a href='javascript:void(0)'
                       on:click|preventDefault={handleLogout}>Logout
                    </a>
                </li>
            {:else}
                <li class:active={$page.path === '/auth'}>
                    <a href='/auth'>Login</a>
                </li>
            {/if}
        </ul>
        <svg viewBox='0 0 2 3'
             aria-hidden='true'>
            <path d='M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z'/>
        </svg>
    </nav>


</header>

<style>
    header {
        display:         flex;
        justify-content: space-around;
        position: fixed;
        left: 35vw;
        width:30vw;
        z-index: 9999;
        margin-bottom: 50px;

    }


    nav {
        display:         flex;
        justify-content: center;
        --background:    hsla(0, 40%, 100%, 0.7);
    }

    svg {
        width:   2em;
        height:  3em;
        display: block;
    }

    path {
        fill: var(--background);
    }

    ul {
        position:        relative;
        padding:         0;
        margin:          0;
        height:          3em;
        display:         flex;
        justify-content: center;
        align-items:     center;
        list-style:      none;
        background:      var(--background);
        background-size: contain;
    }

    li {
        position: relative;
        height:   100%;
    }

    li.active::before {
        --size:     6px;
        content:    '';
        width:      0;
        height:     0;
        position:   absolute;
        top:        0;
        left:       calc(50% - var(--size));
        border:     var(--size) solid transparent;
        border-top: var(--size) solid var(--accent-color);
    }

    nav a {
        display:         flex;
        height:          100%;
        align-items:     center;
        padding:         0 1em;
        color:           var(--heading-color);
        font-weight:     700;
        font-size:       0.8rem;
        text-transform:  uppercase;
        letter-spacing:  2px;
        text-decoration: none;
        transition:      color 0.2s linear;
    }

    a:hover {
        color: var(--accent-color);
    }
</style>
