<script>
    import { goto } from '$app/navigation';
    import { userStore as user} from './userData';
    export let profile;

    let isUser;
   
    function clicked() {
        goto(`/prof/${profile}`)
    }
</script>
{#if $user.username !== profile}
    <button on:click={clicked}>{profile}</button>
    {:else}
    <p>Me</p>
{/if}
<style>
    button {
        background-color: inherit;
        color: var(--accent-color);
        border: none;
        cursor: pointer;
        width: 100%;
      
        padding: 0;

    }

    button:hover {
        color: purple;
    }

    p {
        color: var(--accent-color);
        line-height: 1;
        margin: 0 0 4px 0;

    }
</style>