<script context='module'>
    import { enhance } from '$lib/form';



    export const load = async ({ fetch, page }) => {
        let { user } = page.params;
        let res = await fetch(`/${user}.json`);

        if (res.ok) {
            const data = await res.json();

            return {
                props: {
                    user: { ...data }
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


    export let user;
    $userStore = { ...user };
    $:console.log($userStore);
    let data;
    $:data = $userStore;

    let isLogged = false;
    let newUser = {
        username: ''
    };


</script>

{#if user.username}
    <h1>
        {user.username}
    </h1>
    <div class='follow'>
        {#if user.followerOf}
            <h2>You follow {user.followedBy.length  || '0'} users</h2>
        {/if }
        {#if user.followedBy}
            <h2>You are followed by {user.followerOf.length || '0'} users</h2>
        {/if}
    </div>
    <ul>
        {#if user.comments.length > 0}
            {#each user.comments as comment}
                <li><p>
                    <span class="song"> 
                        {comment.jam.song.name}
                    </span>
                    
                    
                  
                        <br />
                        
                    {comment.jam.show.info}

                </p>
                    <p class='info'>
                    {comment.text}
                    </p>
                </li>

            {/each}
        {/if}
    </ul>
{/if}



{#if !user.username && !isLogged}
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
				    votes: [],
				    followerOf: [],
				    followedBy: []
				};
                isLogged = true;
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

    h1 {
        margin-top: 150px;
        color: #e3e6f1;
    }
    h2 {
        color: #7c7d7d;
    }
    ul {
        list-style-type: none;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-content: center;
    }
    li{
        color: #e7edf3;
        font-size: 1.2rem;
        box-shadow: -5px 5px 5px 0 hsla(0, 0%, 10%, 0.7),5px -5px 5px 0 hsla(0, 0%, 60%, 0.7),
        inset 2px -2px 4px 0 hsla(0, 0%, 10%, 0.7), inset -2px 2px 4px 0 hsla(0, 0%, 60%, 0.7);
        border-radius: 20px;
        padding: 5px;
        margin: min(10vw, 50px);
        flex: 2 1 40vw;



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
    .follow {
        display:         flex;
        flex-flow: column wrap;
        justify-content: space-between;
    }

    p {
        color: #e7edf3;
        font-size:    1.2rem;
        margin :35px;
    }
    .song {
        color: rgb(173, 202, 221);
    }

    p.info   {
        color: #bbbbbb;
        font-size: 1rem;
    }
</style>