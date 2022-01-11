import { apiJam } from './_apiJam.js';


export const get = async (request) => {
	const { jam } = request.params;

	const res = await apiJam(request, `/${jam}`);
	if (res.status === 200) {
		return res;
	}
};

export const post = async (request) => {

	const response = await apiJam(request, `jams/${request.params.jam}`, {
		// because index.svelte posts a FormData object,
		// request.body is _also_ a (readonly) FormData
		// object, which allows us to get form data
		// with the `body.get(key)` method
		userid: request.locals.user.issuer,
		text: request.body.get('text')
	});

	return response;
};

