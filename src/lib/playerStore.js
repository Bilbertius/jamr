import { writable } from 'svelte/store';

export const playerStore = writable({
    isPlaying : false,
    url: '',
    playing: '',
    track: '',
    queue: []
});
