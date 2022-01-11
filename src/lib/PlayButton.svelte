<script>
    import { createEventDispatcher } from 'svelte';
    import Play from 'svelte-icons/fa/FaPlay.svelte';
    export let jam;

    const dispatch = createEventDispatcher();

    function handleClick(e) {
        dispatch('playsong', {
            url: jam.url,
        })
    }

</script>


<div class="container">

    <button class="icon" on:click={handleClick}> 
        <Play />
    </button>
    
</div>

<style>

.container { 
    display: flex;
    justify-content: space-around;
    
}


.icon {
    background-color: inherit;
    border:           none;
    color:            #baffba;
    height:           32px;
    width:            32px;
}

.icon:hover {
    color: #2a817d;
}


.icon:active {
    color: #2a817d;
}
</style>