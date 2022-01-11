<script>
    import { enhance } from '$lib/form.js';
    import { userStore } from '$lib/userData';
    import { vStore, rating} from '$lib/voteStore';


    export let votes;
    export let jamId;
    let stars = 0;

    $:stars = $rating;



</script>


<form
  on:submit|preventDefault
  class='rating'
  action='./{jamId}.vote.json'
  method='post'
  use:enhance={{
			result: async (res, form) => {
			    //Assign the JSON response to newVote;
				const newVote = await res.json();
				//If this vote is the first for this jam then assign it to the vStore
				if ($vStore.length === 0) {
				    $vStore = [newVote];
				} else {
				//If not the first vote check to see if first user vote
                    for( let i = 0;i < $vStore.length;i++) {
                        if (newVote.user.username === $vStore[i].user.username) {
                            //If user has already voted on this jam assign newVote to spot
                            //in vStore array that held their previous vote
                            $vStore[i] = newVote;
                        } else {
                            //if not first overall and first for user assign to vStore array and
                            //spread the rest of the vStore array in with it
                            $vStore = [...$vStore, newVote]
                        }
				    }
                }
				$vStore = [...$vStore];

				$userStore = {
				    ...$userStore,
				     votes: [...$userStore.votes, newVote]
				     }
			}}}>

    <label>
        <input type='radio'
               name='rating'
               bind:group={stars}
               value={1}
               onchange="this.form.requestSubmit()"
        />
        <span class='icon'>★</span>
    </label>
    <label>
        <input type='radio'
               name='rating'
               bind:group={stars}
               value={2}
               onchange="this.form.requestSubmit()"
        />
        <span class='icon'>★</span>
        <span class='icon'>★</span>
    </label>
    <label>
        <input type='radio'
               name='rating'
               bind:group={stars}
               value={3}
               onchange="this.form.requestSubmit()"
        />
        <span class='icon'>★</span>
        <span class='icon'>★</span>
        <span class='icon'>★</span>
    </label>
    <label>
        <input type='radio'
               name='rating'
               bind:group={stars}
               value={4}
               onchange="this.form.requestSubmit()"
        />
        <span class='icon'>★</span>
        <span class='icon'>★</span>
        <span class='icon'>★</span>
        <span class='icon'>★</span>
    </label>
    <label>
        <input type='radio'
               name='rating'
               bind:group={stars}
               value={5}
               onchange="this.form.requestSubmit()"
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