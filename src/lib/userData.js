import { writable } from 'svelte/store';





export const userStore = writable({
    username: null,
    email: null,
    id: null,
    votes: [],
    comments: [],
    following: [],
    followers: []

});

