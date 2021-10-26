<script>
    import { enhance } from '$lib/form';
    import { writable } from 'svelte/store';


    export let jam;
    let commentStore = writable([]);

    let { id, song, show, votes, comments } = jam;
    $commentStore = comments.reverse();


</script>


<form
  class='new'
  action='{id}.json'
  method='post'
  use:enhance={{
			result: async (res, form) => {
				const comment = await res.json();
                $commentStore = [comment, ...$commentStore]
                console.log($commentStore)
				form.reset();
			}
		}}
>

    <div class='inputs'>
        <input type='text'
               name='text'
               aria-label='Add comment'
               placeholder='Add a comment'/>
        <input type='submit'>

    </div>
</form>
<article>
    {#if $commentStore.length > 0}
        <div class='comments'>
            {#each $commentStore as comment}
                <div class='comment'>
                    <p> {comment.text}</p>
                   <span>

                    <h3>
                        {comment.user.username}
                    </h3>
                    <h4>

                        {new Date(comment.date_posted).toLocaleString()}
                    </h4>
                   </span>
                </div>
            {/each}
        </div>
    {/if}
</article>


<style>
    span {
        display: flex;
        align-items:    flex-start;
    }
    form {
        position: relative;
    }

    .comments {

        display:        flex;
        flex-direction: column;
        height:         15vh;
        width:          auto;
        gap:            25px;

    }

    h3 {
        color:        #1cad84;
        font-size:    1.2rem;
        margin-right: 10px;
    }

    .comment {
        display:        flex;
        align-items:    flex-start;
        flex-direction: column;

        line-height:    2;
        border-radius:  15px;
        padding:        5px;
        box-shadow:     3px 3px 10px hsla(180, 1%, 9%, 0.6),
                        -3px -3px 10px hsla(180, 1%, 69%, 0.6),
                        inset -2px -3px 2px hsla(180, 1%, 9%, 0.6),
                        inset 2px 2px 3px hsla(180, 1%, 69%, 0.6);;
    }

    .comment > p {
        color: #d0dde9;

    }

    form {

    }

    .inputs {
        display:        flex;
        flex-direction: column;
        gap:            15px;
        align-items:    center;
    }

    input {
        width:            20vw;
        margin-bottom:    0;
        line-height:      2;
        background-color: inherit;
        color:            #e7edf3;

    }

    input[type='submit'] {
        margin:  0 auto 15px;
        padding: 25px;
        width:   20vw;
    }
</style>