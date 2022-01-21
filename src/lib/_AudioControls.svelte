<script>
    import { playerStore } from './playerStore.js';
    import AudioControls from 'svelte-audio-controls';

    let url, playing, track, isPlaying;

    $:url = $playerStore.url ? $playerStore.url : null;
    $:playing = $playerStore.playing ? $playerStore.playing : null;
    $:track = $playerStore.track ? $playerStore.track : null;
    $:isPlaying = $playerStore.isPlaying ? $playerStore.isPlaying : null;



</script>

<div>

    <p>
        {isPlaying && playing ? track + ' - ' + playing : 'No track selected'}
    </p>

    <span>
    <AudioControls
    
      src={url}

      display={true}
      iconColor='aqua'
      backgroundColor='hsla(0,0%, 20%, .9)'
      barPrimaryColor='darkgrey'
      barSecondaryColor='grey'
    >
    </AudioControls>
    </span>
</div>

<style>
    span {
        padding: 20px;
    }
    p {
        color:            #bbbdbe;
        margin:           15px 0 0 0;
        background-color: hsla(0,0%, 20%, 0.8);
        padding:          15px;
        font-size:        16px;
        font-weight:      bold;
        height:           40px;
    }
    
    div {
        background-color: hsla(0,0%, 20%, 0.8);
        align-self: center;
        position:                sticky;
        margin : 0 auto;
        width: 100%;
        bottom:                   0;
        box-shadow: 0 -5px 10px 0 hsla(0,0%, 10%, 0.5);



    }
    div:hover {
       opacity: 1;
    }

    @media only screen and (max-width: 420px) {
        
        p {
            padding: 5px;
            margin-top: 15px; 
            font-weight: normal;
            font-size: 16px;
        }
    }
</style>