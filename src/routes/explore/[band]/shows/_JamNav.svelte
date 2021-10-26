<script>
    import { store as authStore } from '$lib/auth';
    import Comment from './_Comment.svelte';
    import Vote from '$lib/Vote.svelte'

    export let jam;
    let rate;
    let hide = true;


    function expand() {
        hide = !hide;
    }


</script>



<article>
    <div>
        <a sveltekit:prefetch
           href='shows/jams/{jam.id}'>
            <h2>{jam.song.name}</h2>
        </a>
        <h2>Rating : </h2><Vote rating={jam.votes}/>
    </div>

    <div class='comments'>
        {#each jam.comments as comment}
            <Comment {comment}/>
        {/each}
    </div>

</article>


<style>

    h2, h3 {
        color: hsl(206, 82%, 71%);


    }

    button {
        background-color: inherit;
        color:            white;
        margin-right:     1px;
        margin-left:      auto;
    }

    div.comments {
        display:         flex;
        width:           40vw;
        justify-content: space-between;
        text-decoration: none;
        color:           #eae6e6;
    }
</style>