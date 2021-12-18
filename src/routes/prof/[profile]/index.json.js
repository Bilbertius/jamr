import { apiProfile } from './_profileApi.js';


export const get = async (request) => {

    let { profile } = request.params;


    const res = await apiProfile(request, `/${profile}`);

    if (res.status === 200) {

        return res;
    }
};


// POST /todos.json
export const post = async (request) => {
    let { profile } = request.params;
    const response = await apiProfile(request, `/${profile}`, {
        followed: request.params.profile,
        follower: request.locals.user.issuer
    });

    return response;
};
