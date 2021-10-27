import { apiUser } from './_apiUser.js';



export const get = async (request) => {
	const { email } = request.params.user;
	const res = await apiUser(request, `/${email}`)
	if (res.status === 200) {

		return res;
	}
}

export const post = async (request) => {

	const response = await apiUser(request, ``, {
		// because index.svelte posts a FormData object,
		// request.body is _also_ a (readonly) FormData
		// object, which allows us to get form data
		// with the `body.get(key)` method
		id: request.locals.user.issuer,
		email: request.body.get('email'),
		username: request.body.get('username')
	});

	return response;
};
