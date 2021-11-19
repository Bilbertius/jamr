<script>
    export let song;
    let hide = false;

    function hideJams() {
        hide = !hide;
    }
</script>

<li>
    <div>
        <h4>
            {song.name}
        </h4>
        <button on:click={hideJams}>^</button>
    </div>
    {#if hide}
        {#each song.jams as jam }
            <ul>
                <li>
                    {jam.show.info}</li>
            </ul>
        {/each}
    {/if}
</li>


<style>
    li {
        color:          white;
        box-shadow:     2px 2px 2px 0 hsla(0, 0%, 10%, 0.7),
                        -2px -2px 2px 0 hsla(0, 0%, 50%, 0.7),
                        inset -1px -1px 0 0 hsla(0, 0%, 10%, 0.7),
                        inset 1px 1px 0 0 hsla(0, 0%, 40%, 0.7);
        margin:         10px auto;
        padding:       12px 8px;
        border-radius:  15px;
        display:        flex;
        flex-direction: column;

    }

    ul {
        list-style-type: none;
        padding:         20px;
    }

    button {
        height:           3vh;
        width:            3vw;
        border-radius:    50%;
        margin-right:     0;
        color:            aquamarine;
        border:           none;
        background-color: inherit;
        box-shadow:       2px 2px 2px 2px hsla(0, 0%, 10%, 0.7),
                          -2px -2px 2px 0 hsla(0, 0%, 50%, 0.7),
                          inset 0 -2px 0 0 hsla(0, 0%, 10%, 0.7),
                          inset 0 1px 0 0 hsla(0, 0%, 40%, 0.7);
    }

    div {
        display:     flex;
        align-items: center;
    }

</style>