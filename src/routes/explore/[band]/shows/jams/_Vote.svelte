<script context='module'>

    export const load = async ({ fetch, page }) => {
        //jam is made available by the page since this route is named [jam]
        const { band, jam } = page.params;
        //fetches the index.json.js f
        const data = await fetch(`/explore/${band}/shows/jams/${jam}.votes.json`).then((res) => res.json());

        return {
            props: { votes: data }
        };
    };


</script>

<script>
    import StarRating from 'svelte-star-rating';
    import VoteInput from './_VoteInput.svelte';
    import { vStore, rating } from '$lib/voteStore';

    export let votes;
    export let jamId;


    $vStore = votes;







</script>

<div>
    <StarRating rating={$rating}/>
    <VoteInput  {jamId} votes={$vStore} />

</div>


<style>
    div {
        display: flex;
        justify-content: space-around;
    }
</style>