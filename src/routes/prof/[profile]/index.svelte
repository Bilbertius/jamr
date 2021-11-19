<script context='module'>

    // see https://kit.svelte.dev/docs#loading
    export const load = async ({ fetch, page }) => {
        try {
            const { profile } = page.params;
            console.log();
            const data = await fetch(`./${profile}.json`).then(res => res.json());

            return {
                props: { profile: await data }
            };
        } catch (e) {
            console.log(e);
        }

    };
</script>

<script>
    export let profile = {};
</script>

<style>
    article {
        padding: 25px 25px;
    }

</style>

<article>
    <h1>
        {profile.username}
    </h1>
    <ul>

        {#each profile.comments as comment }
            <li>{comment.text}</li>
        {/each}
    </ul>

</article>