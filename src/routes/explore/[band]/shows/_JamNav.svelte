<script>
    import Comment from './_Comment.svelte';
    export let jam;
    let hide = true;
    function expand() {
        hide = !hide;
    }
</script>



<article>
    <div>
        <a sveltekit:prefetch
           href='./shows/jams/{jam.id}'>
            <h2>{jam.song.name}</h2>
        </a>
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
        width:           100%;
        flex-flow: column-reverse;
        justify-content: space-between;
        text-decoration: none;
        color:           #eae6e6;
    }
</style>