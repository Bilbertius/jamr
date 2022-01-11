<script>
    import { playerStore } from './playerStore.js';

     $:url = $playerStore ? $playerStore.url : null;
     $:playing = $playerStore.playing ? $playerStore.playing : null;
     $:track = $playerStore.track ? $playerStore.track : null;
     $:isPlaying = $playerStore.isPlaying ? $playerStore.isPlaying : null;
</script>

<figure>
{#if isPlaying}

    <audio controls
           autoplay
           muted
           preload='auto'
           src={url}></audio>
    <figcaption>{track} |{playing}</figcaption>
    {/if}
</figure>
<style>
    figcaption {
        color:white;
        font-size: 1.5rem;
    }
    figure {
        height: 100px;
        display:          flex;
        flex-flow: column;
        background-color: inherit;
        width:            80%;
        padding:          10px 10px 30px 10px;
        border-radius:    max(0px, min(16px, (100% - 400px + 1px)* 9999)) / 16px;

        align-items:      center;
        justify-content: space-around;
    }
    audio {
        width: 65%;
    }

    @media only screen and (max-width: 800px) {

        figcaption {
            font-size: 1rem;
        }
        figure, article {
            box-shadow: none;
            width: 100%;
        }
    }

</style>
