<script>
	import SongHead from './_SongHead.svelte';
	export let album;
	let hide = false;
	let hideJams = false;

	function showAlbum() {
		hide = !hide;
	}

</script>


<li>
	<div>
		<h3>{album.name}</h3>
		<button on:click={showAlbum}>See</button>
	</div>

	{#if hide}
		<ul>
			{#each album.songs as song (song.id)}
				<SongHead {song} />
			{/each}
		</ul>
		{/if}
</li>

<style>
    li {
        color:          white;
        box-shadow:     1px 1px 1px 1px hsla(0, 0%, 10%, 0.7), -1px -1px 1px 0px hsla(0, 0%, 50%, 0.7), inset 0px -1px 0px 0px hsla(0, 0%, 10%, 0.7), inset 0px 1px 0px 0px hsla(0, 0%, 40%, 0.7);
        margin:         18px auto;
        padding:        1px 5px;
        border-radius:  15px;
        display:        flex;
        flex-direction: column;

    }

    ul {
        list-style-type: none;
        padding:         20px;
    }

    button {
        height:           3vh;
        width:            3vw;
        border-radius:    50%;
				margin-right:  		0;
				margin-left: auto;
        color:            aquamarine;
        border:           none;
        background-color: inherit;
        box-shadow:       1px 1px 1px 1px hsla(0, 0%, 10%, 0.7), -1px -1px 1px 0px hsla(0, 0%, 50%, 0.7), inset 0px -1px 0px 0px hsla(0, 0%, 10%, 0.7), inset 0px 1px 0px 0px hsla(0, 0%, 40%, 0.7);
    }

    div {
        display:     flex;
        align-items: center;
    }
</style>