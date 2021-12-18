<script context='module'>

    // see https://kit.svelte.dev/docs#loading
    export const load = async ({ fetch, page }) => {
        try {
            const { profile } = page.params;

            const data = await fetch(`./${profile}.json`).then(res => res.json());

            return {
                props: { profile: await data }
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

    console.log(profile);
    let isFollowing = !!$user.followerOf.some(f => f.followedUsername);
    console.log($user);


</script>

<style>
    article {
        padding: 25px 25px;
    }

    ul {
        list-style-type: none;
    }

    li {
        background-color: #969a9f;

        border-radius:    30px;
    }

    span {
        padding:     25px;
        line-height: 2;
    }

    h4 {
        color: #1d1c1c;
    }

    p {
        background-color:           #555151;
        color:                      #e7edf3;
        padding:                    15px;
        border-bottom-left-radius:  30px;
        border-bottom-right-radius: 30px;
    }

    div {
        border-radius: 55px;
    }
</style>

<article>
    <h1>
        {profile.username}
    </h1>
    {#if !isFollowing}
        <form
          action='/prof/{profile.username}.json?_method=post'
          method='post'
          use:enhance={{
					result: async (res, form) => {
					    const follower = await res.json();
					    $user.followerOf = [...$user.followerOf, follower];
                       isFollowing = true;

					}
				}}
        >

            <button class='submit'
                    aria-label='Follow {profile.username}'>Follow
            </button>
        </form>
    {/if}
    {#if isFollowing}
        <form
          action='/prof/{profile.username}?_method=delete'
          method='post'
          use:enhance={{

					result: async () => {
						$user.followerOf = [...$user.followerOf.filter((f) =>f.username !== profile.username)];
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
        {#if profile.comments.length > 0}
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