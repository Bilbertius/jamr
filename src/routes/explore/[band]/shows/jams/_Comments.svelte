<script>
    import { enhance } from '$lib/form';
    import { writable } from 'svelte/store';
    import UserLink from '$lib/UserLink.svelte';


    export let jam;
    let commentStore = writable([]);

    let { id, song, show, votes, comments } = jam;
    $commentStore = comments;


</script>

<div class='wrapper'>

<form
  class='new'
  action='{id}.json'
  method='post'
  use:enhance={{
			result: async (res, form) => {
				const comment = await res.json();
                $commentStore = [comment, ...$commentStore];

				form.reset();
			}
		}}
>

    <div class='inputs'>
        <textarea
          rows='5'
          cols='60'
          name='text'
          aria-label='Add comment'
          placeholder='Add a slick comment you dweeb'
          required
        ></textarea>
        <input type='submit'>

    </div>
</form>
<article>
    {#if $commentStore.length > 0}
        <div class='comments'>
            {#each $commentStore as comment}
                <div class='comment'>
                    <p> {comment.text}</p>
                    <div class='user-info'>
                        <h3>
                             <UserLink profile={comment.user.username} />
                        </h3>
                        <h2>
                            {new Date(comment.date_posted).toLocaleString()}
                        </h2>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
    {#if $commentStore.length === 0}
        <h1>
            Be The First To Comment
        </h1>
    {/if}
</article>

</div>

<style>
    span {
        display:     flex;
        align-items: flex-start;
    }
    div.wrapper {
        width: 100vw;
        display: flex;
        align-items: center;
        flex-flow: column;
    }
    form {
        position: relative;
        width: auto;
    }
    article {

        overflow: scroll;
        height: 40vh;
        padding: 40px 30px;
        box-shadow: inset 6px 6px 6px hsla(0, 0%, 10%, 0.6), inset  -6px -6px 6px hsla(0, 0%, 70%, 0.6);
        border-radius: 15px;
    }

    article::-webkit-scrollbar {
        display: none;
    }

    article::-webkit-scrollbar-track {
        visibility: hidden;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }

    article::-webkit-scrollbar-thumb {
        background-color: inherit;
        -webkit-box-shadow: 2px 2px 2px hsla(0, 0%, 20%, 0.6);
        border-radius: 10px;
    }



    .comments {

        display:        flex;
        flex-direction: column;
        height:         15vh;

        gap:            25px;


    }


    p {
        font-size: .8rem;
        color:     #e5e5e5;
    }

    h3 {
        color:        #48dfb4;
        font-size:    1.2rem;
        margin-right: 10px;

    }

    h2 {
        color: #dfdede;
    }


    .comment {
        display:        flex;
        align-items:    flex-start;
        flex-direction: column;

        line-height:    2;
        border-radius:  15px;

        box-shadow:     1px 1px 4px hsla(180, 0%, 10%, 0.6),
                        -1px -1px 4px hsla(180, 0%, 60%, 0.6),
                        inset -1px -1px 1px hsla(180, 0%, 10%, 0.6),
                        inset 1px 1px 1px hsla(180, 0%, 60%, 0.6);;
    }

    .comment > p {
        padding:   5px 25px;
        color:     #ffffff;
        font-size: 1.2rem;

    }

    .user-info {
        padding:                    5px 25px;
        border-bottom-left-radius:  15px;
        border-bottom-right-radius: 15px;
        display:                    flex;
        width:                      calc(100% - 50px);
        align-items:                center;
        background-color:           #6a6a6a;
    }

    div.inputs {
        display:        flex;

        flex-direction: column;
        gap:            15px;
        align-items:    center;
    }

    textarea::placeholder {
        color: #e6e6e6;
    }

    input {
        width:            40vw;
        margin-bottom:    0;
        padding:         5px;
        line-height:      2;
        background-color: inherit;
        color:            #e6ecf2;
        border-radius:    15px;

    }

    textarea {
        background-color: hsla(180, 0%, 40%, 0.6);
        box-shadow:     -4px -4px 4px hsla(180, 0%, 10%, 0.6),
                        4px 4px 4px hsla(180, 0%, 60%, 0.6),
                        inset 4px 4px 4px hsla(180, 0%, 10%, 0.6),
                        inset -4px -4px 4px hsla(180, 0%, 60%, 0.6);
        border-radius:    5px;
        outline:          none;
        padding:          5px 15px;
        color:            #c7c5c5;;
        border:           none;
        font-size:        1.2rem;


    }

    input[type='submit'] {
        margin: 0 auto 15px;
        background-color: hsl(0, 0%, 30%);
    }
    h1 {
        color: #7c7d7d;
    }

    @media only screen and (min-width:  800px) {
        article {
            width: 80vw;
        }
        textarea { width: 80vw;}
    }

    @media only screen and (max-width: 420px) {
        h1 {
            font-size: 1.2rem;
        }
        article {
            width: 300px;
        }
        textarea { width:300px;}
    }
</style>