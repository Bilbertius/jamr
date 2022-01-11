import { writable, derived } from 'svelte/store';



export const vStore = writable([]);

export const rating = derived(vStore, $vStore => {
    let len = $vStore.length > 0 ? $vStore.length : 0;
    if (len <= 0) {
        return 0;
    }
    let tally = 0;
    let i;
    for (i=0;i<len;i++) {
        tally += $vStore[i].rating;
    }

    return tally / len || 0;


})