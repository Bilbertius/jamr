<script context='module'>

    // see https://kit.svelte.dev/docs#loading
    export const load = async ({ fetch, page }) => {
        try {
            const { profile } = page.params;

            const data = await fetch(`./${profile}.json`).then(res => res.json());
          
            return {
                props: { profile: data }
            };
        } catch (e) {
            console.log(e);
        }

    };
</script>

<script>
    import { enhance } from '$lib/form';
    import { userStore as user } from '$lib/userData';



    export let profile = {};
    let isFollowing = $user.followers.filter(f => f.followingId === profile.id).length > 0;
</script>

<svelte:head>
    <title>{profile.username}</title> 
</svelte:head>


<article>
    <h1>
        {profile.username}
    </h1>
    {#if !isFollowing}
        <form
          action='/prof/{profile.id}.json?_method=post'
          method='post'
          use:enhance={{
					result: async (res, form) => {
					    const follow = await res.json();
                        console.log(follow);
                        console.log({'Before' : $user.followers})
					    $user.followers = [...$user.followers, follow];
                        console.log({'after' :  $user.followers})
                        isFollowing = true;

					}
				}}
        >

            <button class='submit'
                    aria-label='Follow {profile.username}'> Follow
            </button>
        </form>
    {/if}
    {#if isFollowing}
        <form
          action='/prof/{profile.id}.json?_method=delete'
          method='post'
          use:enhance={{
					result: async (res,form) => {
                        console.log({'Before' : $user.followers})
						$user.followers = [...$user.followers.filter((f) => f.followingId !== profile.id)];
                        console.log({'after' :  $user.followers})
						isFollowing = false;
					}
				}}
        >
            <button class='delete'
                    aria-label='Unfollow'>Unfollow
            </button>
        </form>
    {/if}

    <h2>User Comments</h2>
    <ul>
        {#if profile.comments && profile.comments.length > 0}
            {#each profile.comments as comment }
                <li>
                    <div>
                        <h4>
                            <span>
                                {comment.text}
                            </span>
                        </h4>
                        <p>
                            {comment.jam.show.info}
                        </p>
                    </div>
                </li>
            {/each}
        {/if}
    </ul>

</article>

<style>
    article {
        padding: 25px 25px;
        width: 40vw;
    }

    ul {
        list-style-type: none;
        display: flex;
        flex-flow: column nowrap;
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
        margin: 20px;
        flex: 1 1 400px;
        min-width: 400px;
    }


    button {
        background-color: inherit;
        color: var(--accent-color);
        box-shadow: -2px 2px 4px 0 hsla(0, 0%, 10%, 0.7),2px -2px 4px 0 hsla(0, 0%, 40%, 0.7),
                    inset 2px -2px 4px 0 hsla(0, 0%, 10%, 0.7), inset -2px 2px 4px 0 hsla(0, 0%, 40%, 0.7);
        border: none;
        padding : 20px;
        font-size:1.1rem;
        border-radius: 20px;
        cursor : pointer;
        width: 100px;

    }

    button:hover {
        color: mediumpurple;
        background-color: hsl(0,0%,22%);
    }
    button:active {
        box-shadow: inset -2px 2px 4px 0 hsla(0, 0%, 8%, 0.7),inset 2px -2px 4px 0 hsla(0, 0%, 40%, 0.7), 2px -2px
                    4px 0 hsla(0, 0%, 8%, 0.7), -2px 2px 4px 0 hsla(0, 0%, 40%, 0.7);
        background-color: hsl(0,0%,18%);
    }

    span {
        padding:     25px;
        line-height: 2;
    }

    h4 {
        color: #1d1c1c;
    }

    p {

        color:                      #e7edf3;
        padding:                    15px;
        border-bottom-left-radius:  30px;
        border-bottom-right-radius: 30px;
    }

    div {
        border-radius: 55px;
    }
</style>