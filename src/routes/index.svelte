<script context='module'>
    export const prerender = true;

</script>
<script>


</script>

<svelte:head>
    <title>Home</title>
</svelte:head>
<section>

<img src='../../static/onlyjamsdark.png'
     alt='only jams'>
</section>

<style>
    section {
        display:         flex;
        flex-direction:  column;
        justify-content: center;
        align-items:     center;
        flex:            1;
    }


    img {
        margin: 20vh 10vw;
        max-width: 80vw;
        border-radius: 50px;
        box-shadow: var(--neumorph-deep);
        transition:ease-in;
    }
</style>
