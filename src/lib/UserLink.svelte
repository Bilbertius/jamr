<script>
    import { goto } from '$app/navigation';
    export let profile;

    function clicked() {
        goto(`/prof/${profile}`)
    }
</script>

<button on:click={clicked}>{profile}</button>