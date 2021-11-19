<script>

    import JamNav from './_JamNav.svelte';


    export let show, band;
    let hide = true;


    function showJams() {
        hide = !hide;
    }

</script>


<li>
    <div>
        <h3>
            {show.info}
        </h3>
        <button on:click={showJams}>v</button>
    </div>
    {#if hide === false}
        <ul>
            {#each show.jams as jam}
                <li>
                    <div>
                            <JamNav {jam}/>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
</li>

<style>
    li {
        color:         white;
        box-shadow:    1px 1px 1px 1px hsla(0, 0%, 10%, 0.7),
                       -1px -1px 1px 0 hsla(0, 0%, 50%, 0.7),
                       inset 0 -1px 0 0 hsla(0, 0%, 10%, 0.7),
                       inset 0 1px 0 0 hsla(0, 0%, 40%, 0.7);
        margin:        8px auto;
        padding:       15px 15px;
        border-radius: 15px;

    }

    ul {
        list-style-type: none;
        padding:         20px;
    }

    button {
        height:           2vh;
        width:            2vh;
        border-radius:    50%;
        color:            aquamarine;
        border:           none;
        background-color: inherit;
        box-shadow:       1px 1px 1px 1px hsla(0, 0%, 10%, 0.7),
                          -1px -1px 1px 0 hsla(0, 0%, 50%, 0.7),
                          inset 0 -1px 0 0 hsla(0, 0%, 10%, 0.7),
                          inset 0 1px 0 0 hsla(0, 0%, 40%, 0.7);
    }

    div {
        display:         flex;
        align-items:     center;
        justify-content: space-between;
        width: 100%;
    }
</style>