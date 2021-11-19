<script>
    import { enhance } from '$lib/form.js';
    import { userStore } from '$lib/userData'
    export let votes;
    export let jamId;
    let jamVotes;



    $:rating = 0;

</script>


<form
  on:submit|preventDefault
  class='rating'
  action='./{jamId}.vote.json'
  method='post'
  use:enhance={{
			result: async (res, form) => {
				const vote = await res.json();
				jamVotes = [...jamVotes, vote];
				$userStore = {
				    ...$userStore,
				     votes: [...$userStore.votes, vote]
				     }

			}}}>

    <label>
        <input type='radio'
               name='rating'
               bind:group={rating}
               value={1}
               onchange="this.form.submit()"
        />
        <span class='icon'>★</span>
    </label>
    <label>
        <input type='radio'
               name='rating'
               bind:group={rating}
               value={2}
               onchange="this.form.submit()"
        />
        <span class='icon'>★</span>
        <span class='icon'>★</span>
    </label>
    <label>
        <input type='radio'
               name='rating'
               bind:group={rating}
               value={3}
               onchange="this.form.submit()"
        />
        <span class='icon'>★</span>
        <span class='icon'>★</span>
        <span class='icon'>★</span>
    </label>
    <label>
        <input type='radio'
               name='rating'
               bind:group={rating}
               value={4}
               onchange="this.form.submit()"
        />
        <span class='icon'>★</span>
        <span class='icon'>★</span>
        <span class='icon'>★</span>
        <span class='icon'>★</span>
    </label>
    <label>
        <input type='radio'
               name='rating'
               bind:group={rating}
               value={5}
               onchange="this.form.submit()"
        />
        <span class='icon'>★</span>
        <span class='icon'>★</span>
        <span class='icon'>★</span>
        <span class='icon'>★</span>
        <span class='icon'>★</span>
    </label>
</form>


<style>
    .rating {
        display:     inline-block;
        position:    relative;
        height:      25px;
        line-height: 25px;
        font-size:   25px;
    }

    .rating label {
        position: absolute;
        top:      0;
        left:     0;
        height:   100%;
        cursor:   pointer;
    }

    .rating label:last-child {
        position: static;
    }

    .rating label:nth-child(1) {
        z-index: 5;
    }

    .rating label:nth-child(2) {
        z-index: 4;
    }

    .rating label:nth-child(3) {
        z-index: 3;
    }

    .rating label:nth-child(4) {
        z-index: 2;
    }

    .rating label:nth-child(5) {
        z-index: 1;
    }

    .rating label input {
        position: absolute;
        top:      0;
        left:     0;
        opacity:  0;
    }

    .rating label .icon {
        float: left;
        color: transparent;
    }

    .rating label:last-child .icon {
        color: #000;
    }

    .rating:not(:hover) label input:checked ~ .icon,
    .rating:hover label:hover input ~ .icon {
        color: #00ffdd;
    }

    .rating label input:focus:not(:checked) ~ .icon:last-child {
        color:       #000;
        text-shadow: 0 0 5px #02f6da;
    }

</style>