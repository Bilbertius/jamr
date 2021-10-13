<script context='module'>
	import { enhance } from '$lib/form';


	export const load = async ({ fetch, page }) => {
		let { user } = page.params;
		let res = await fetch(`/${user}.json`);

		if (res.ok) {
			const data = await res.json();
			return {
				props: {
					user:  {data}
				}
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message)
		};
	};
</script>


<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { store } from '$lib/auth';


	export let user = 0;
	let logged = user.data ? 1 : 0;
	$: isUser = logged;

	$:auth = store;


	let newUser = {
		email: $page.params.user,
		username: ''
	};

	function handleUser() {

		auth.update({
			user: {
				email: newUser.email,
				username: newUser.username
			}
		});
		newUser = user;
		goto('/explore');
	}
</script>

{#if isUser }
	<h1>
		{user.data.username}
	</h1>
{/if}
{#if !isUser }
	<h2>Finish Sign Up</h2>
	<form
		action='/user.json'
		method='post'
		use:enhance={{
			result: async (res, form) => {


				form.reset();
			}
		}}
	>
		<div>

			<label for='username'>Username : </label>
			<input name='username' id='username' type='text' bind:value={newUser.username}>
		</div>
		<div>

			<input name='email' id='email' type='hidden' bind:value={newUser.email}>

		</div>
		<input id='submit' type='submit' on:click={handleUser}>
	</form>


{/if}

<style>
    form {
        display:         flex;
        flex-direction:  column;
        justify-content: flex-start;
        align-items:     flex-start;
        width:           50%;
        border:          1px solid white;
        padding:         15px;

    }

    h1, h2 {
        color: #e3e6f1;
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