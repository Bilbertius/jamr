<script>

  export let band;

</script>

<a sveltekit:prefetch href="/explore/{band.name}">{band.name}</a>

<style>
  a {
      text-decoration: none;
      color:           #9f9797;
      font-size: 1.4rem;
  }
  a:hover {
      text-shadow: 0 0 80px #97ffc8;
      color:       #d580ff;
  }
</style>