<script>
    export let rating;



</script>


<form class='rating'
      action='vote.json'
      method='post'
>

    <div class='wrap'>
        <input type='checkbox'
               id='st1'
               bind:group={rating}
               value='{1}'/>
        <label for='st1'></label>
        <input type='checkbox'
               id='st2'
               bind:group={rating}
               value='{2}'/>
        <label for='st2'></label>
        <input type='checkbox'
               id='st3'
               bind:group={rating}
               value='{3}'/>
        <label for='st3'></label>
        <input type='checkbox'
               id='st4'
               bind:group={rating}
               value='{4}'/>
        <label for='st4'></label>
        <input type='checkbox'
               id='st5'
               bind:group={rating}
               value='{5}'/>
        <label for='st5'></label>
    </div>
</form>

<style>

    .wrap {
        position:  relative;
        display:   inline-block;
        border:    none;
        font-size: 14px;
        margin:    50px auto;
        left:      50%;
        transform: translateX(-50%);
    }

    .wrap input {
        border:   0;
        width:    1px;
        height:   1px;
        overflow: hidden;
        position: absolute !important;
        clip:     rect(1px 1px 1px 1px);
        clip:     rect(1px, 1px, 1px, 1px);
        opacity:  0;
    }

    .wrap label {
        position: relative;
        float:    right;
        color:    #C8C8C8;
    }

    .wrap label:before {
        margin:              5px;
        content:             "\f005";
        display:             inline-block;
        font-size:           1.5em;
        color:               #ccc;
        -webkit-user-select: none;
        -moz-user-select:    none;
        user-select:         none;
    }

    .wrap input:checked ~ label:before {
        color: #FFC107;
    }

    .wrap label:hover ~ label:before {
        color: #ffdb70;
    }

    .wrap label:hover:before {
        color: #FFC107;
    }
</style>