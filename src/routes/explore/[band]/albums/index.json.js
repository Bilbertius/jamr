
import { apiAlbum } from "./_apiAlbum.js";


export const get = async (request) => {

	const { band } = request.params;

	const res = await apiAlbum(request, `/${band}/albums`)
	if (res.status === 200) {

		return res;
	}
}