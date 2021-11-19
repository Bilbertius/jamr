import { apiProfile } from './_profileApi.js';


export const get = async (request) => {

    let { profile } = request.params;
    console.log(request);

    const res = await apiProfile(request, `/${profile}`);
    console.log(res);
    if (res.status === 200) {

        return res;
    }
};


// POST /todos.json
export const post = async (request) => {
    const response = await apiProfile(request, `/${profile}`, {
        // because index.svelte posts a FormData object,
        // request.body is _also_ a (readonly) FormData
        // object, which allows us to get form data
        // with the `body.get(key)` method
        text: request.body.get('text')
    });

    return response;
};
