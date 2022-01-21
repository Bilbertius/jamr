<script>

    import Play from 'svelte-icons/fa/FaPlay.svelte';
    import { playerStore } from './playerStore.js';


    export let jam;


    function handleClick(e) {
        e.preventDefault();
        $playerStore.url = jam.url;
        $playerStore.track = jam.song.name;
        $playerStore.playing = jam.show.info;
        $playerStore.isPlaying = true;
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
    margin: 5px;
    
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