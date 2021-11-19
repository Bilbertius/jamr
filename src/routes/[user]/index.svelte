<script context='module'>
    import { enhance } from '$lib/form';



    export const load = async ({ fetch, page }) => {
        let { user } = page.params;
        let res = await fetch(`/${user}.json`);

        if (res.ok) {
            const data = await res.json();

            return {
                props: {
                    user: { data }
                }
            };
        }
        const { message } = await res.json();
        return {
            error : new Error(message)
        };
    };
</script>


<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { userStore } from '$lib/userData.js';
    import { store as authStore } from '$lib/auth.js';


    export let user = {};
    $userStore = { ...user.data };
    $:data = $userStore;

    let isLogged = false;
    let newUser = {
        email: $page.params.user,
        username: ''
    };


</script>

{#if data  }
    <h1>
        {data.username}
    </h1>
    {#if data.comments.length === 0}
        <h1>No comments yet</h1>
    {:else}
        <ul>
            {#each data.comments as comment}
                <li>{comment.text}</li>
            {/each}
        </ul>


    {/if}
    {#if data.votes.length === 0}
        <h1>No ratings yet</h1>
    {/if}

{/if}
{#if !data }
    <h2>Finish Sign Up</h2>
    <form
      action='/user.json'
      method='post'
      use:enhance={{
			result: async (res, form) => {
                const created = await res.json();

				$userStore = {
				    id: created.id,
				    username: created.username,
				    email: created.email,
				    comments: [],
				    votes: []
				};

				form.reset();
			}
		}}
    >
        <div>

            <label for='username'>Username :</label>
            <input name='username'
                   id='username'
                   type='text'
                   bind:value={newUser.username}>
        </div>
        <div>

            <input name='email'
                   id='email'
                   type='hidden'
                   bind:value={newUser.email}>

        </div>
        <input id='submit'
               type='submit'
        >
    </form>


{/if}

<style>
    form {
        display:         flex;
        flex-direction:  column;
        justify-content: flex-start;
        align-items:     flex-start;

        border:          1px solid white;
        padding:         15px;

    }

    h1, h2 {
        margin-top: 150px;
        color: #e3e6f1;
    }
    ul {
        list-style-type: none;
    }
    li{
        color: #e7edf3;
        font-size: 1.2rem;
    }

    label {
        color: #d0dde9;

        width: 6vw;
    }

    input {
        width:  20vw;
        margin: 10px;
    }

    #submit {
        width:            100%;
        margin:           0 auto;
        padding:          20px;
        background-color: inherit;
        color:            mediumaquamarine;
    }

    div {
        display:         flex;
        justify-content: space-around;
        align-items:     center
    }
</style>