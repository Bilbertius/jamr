import { api } from './_api';

export const get= async (request) => {
	const response = await api(request, `explore`);

	if (response.status === 404) {
		return { body: [] };
	}
	return response;
}

	export const post = async (request) => {
		let response;
		if(request.body.get('song')) {
			 response = await api(request, `explore/${request.locals.userid}`, {
				song: request.body.get('song'),
				albumId: request.body.get('album'),
				bandId: request.body.get('band')
			})
		} else {

		 response = await api(request, `explore/${request.locals.userid}`, {
			band: request.body.get('band'),
			name: request.body.get('name'),
			year_released: new Date(request.body.get('year')),
		});

		}
		return response;
	};

