<script context='module'>

    export const load = async ({ fetch, page }) => {
        //song is made available by the page since this route is named [song]
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
    export let votes;
    export let jamId;

    let tally = 0;
    let i;
    let len = votes.length;
    $: for (i = 0;i<len;i++) {
        tally += votes[i].rating;
    }
    $:rating = tally / len || 0;



</script>

<div>
    <StarRating {rating}/>
    <VoteInput {jamId} {votes} />

</div>


<style>
    div {
        display: flex;
        justify-content: space-between;

    }
</style>