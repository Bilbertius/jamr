<script>

  export let band;

</script>

<a sveltekit:prefetch href="explore/{band.name}">{band.name}</a>

<style>
  a {
      text-decoration: none;
      color:           #9f9797;
  }
</style>