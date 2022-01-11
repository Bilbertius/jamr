<script>
    import StarRating from 'svelte-star-rating';


    export let rating;



</script>

<style>
    span {
        padding: 15px;
        display: flex;
        align-items: center;
        align-content: center;
        height: 40px;
    }
</style>
<span>


    <StarRating {rating}/>

</span>
