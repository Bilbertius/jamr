<script context="module">
  import { enhance } from '$lib/form';

</script>
<script>


  export let bands;
  let band;
  let name;
  let year;


  function handleSub() {
    console.log({band,name,year})
  }

</script>

<form
  action="/explore.json"
  method="post"
  use:enhance={{
			result: async (res, form) => {


				form.reset();
			}
		}}
>

  <select bind:value={band} name="band" id="band">
    {#each bands as band (band.id)}
      <option value={band.id}>{band.name}</option>
    {/each}
  </select>

  <input type="text" bind:value={name} name="name" placeholder="New Album" />
  <input type="text"  bind:value={year} name="year" placeholder="Release Year">

  <input type="submit" on:click={handleSub}>


</form>

<style>
  form {
    background-color: hsl(150, 0%, 25%);
    box-shadow: 5px 5px 22px 0px hsla(0,0%,10%, 0.7), -5px -5px 22px 0px hsla(0,0%,50%, 0.7), inset -2px -2px 8px 0px hsla(0,0%,10%, 0.7), inset 2px 2px 8px 0px hsla(0,0%,50%, 0.7);
    padding: 40px;

  }
  ::placeholder {
    color: white;
  }
  option, select, input {
  PADDING: 3PX;
    font-size: 2ch;
    color: white;
    background-color: hsl(150, 0%, 25%);
    box-shadow: 5px 5px 22px 0px hsla(0,0%,10%, 0.7), -5px -5px 22px 0px hsla(0,0%,50%, 0.7), inset -2px -2px 8px 0px hsla(0,0%,10%, 0.7), inset 2px 2px 8px 0px hsla(0,0%,50%, 0.7);

  }

</style>