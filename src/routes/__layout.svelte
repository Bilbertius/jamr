<script context="module">
	import { store as authStore } from '$lib/auth';
	export async function load({ fetch }) {
		const res = await fetch('/api/auth/user');
		const { user } = await res.json();
		authStore.set({
			loading: false,
			user
		});
		return {
			status: 200,
			context: {
				user
			}
		}
	}
</script>
<script>
	import Header from '$lib/header/Header.svelte';
	import '../app.css';

</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>Made by <a href="https://will-macneil.now.sh">Will</a> </p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
