
import { apiShow } from "./_apiShow.js";



export const get = async (request) => {

	const { band } = request.params;

	const res = await apiShow(request, `/${band}/shows`)

	if (res.status === 200) {

		return res;
	};
}



export const post = async (request) => {
	const {band} = request.params;

	const response = await apiShow(request, `/${band}`, {

		comment: request.body.get('comment')
	});

	return response;
};
