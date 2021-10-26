<script>
	import { page } from "$app/stores";

	const  { band }  = $page.params;


</script>

<nav>
	<ul>
		<li class:active={$page.path === `/explore/${band}/shows`}><a sveltekit:prefetch
                                                                      href="/explore/{band}/shows">Shows</a>
		<li class:active={$page.path === `/explore/${band}/albums`}><a sveltekit:prefetch href="/explore/{band}/albums">Albums</a></li>
	</ul>
</nav>
<main>
	<slot></slot>
</main>
<style>
	nav {
      display: flex;
      flex-direction: column;

			width: 100%;
	}
	ul {
      display: flex;
      justify-content: space-around;
      list-style-type: none;
      padding-inline-start: 0px;
	}
	li.active > a {
			color: white;
	}


	:global(h1) {

				color: white;

	}
</style>
