<script context="module">
  import { enhance } from '$lib/form';

</script>
<script>
  export let bandId;
  export let albumId;
  export let show;
  export let id;
  let song;

  function hide() {
    show ? !!show : !show;
  }

</script>

{#if show && albumId === id}

<form
  action="/explore.json"
  method="post"
  use:enhance={{
			result: async (res, form) => {
				form.reset();
			}
		}}
>

  <input type="hidden" bind:value={bandId} name="band">
  <input type="hidden" bind:value={albumId} name="album">
  <input type="text" bind:value={song} name="song" placeholder="New Song" autofocus/>


  <input type="submit" >


</form>
  <button name="cancel" on:click={hide}>X</button>
{/if}

<style>
    form {
        margin-left: 15px;
    }

    button {
        background-color: inherit;
        color: red;
        border: none;
        margin-left: 10px;
        border-radius: 50%;
        box-shadow: 2px 2px 2px 2px hsla(176, 0%, 5%, 0.9), -2px -2px 2px 2px hsla(176, 0%, 54%, 0.9);
    }

</style>