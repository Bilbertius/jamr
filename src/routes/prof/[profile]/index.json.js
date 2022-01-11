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
        following: profile,
        follower: request.locals.user.issuer
    });
    return response;
};


// DELETE /
export const del = async (request) => {
    let { profile } = request.params;

    return await apiProfile(request, `prof/${profile}/${request.locals.user.issuer}`);

  
};
