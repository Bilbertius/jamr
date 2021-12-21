import { apiVote } from './_apiVote.js'

export const get = async (request) => {
	const { jamId } = request.params;
	const res = await apiVote(request, `/${jamId}`);
	if (res.status === 200) {
		return res;
	}
};

export const post = async (request) => {
    const { jamId  } = request.params.jamId;
    const response = await apiVote(request, `/${jamId}`, {
         rating : request.body.get('rating'),
    });
    return response;
 };