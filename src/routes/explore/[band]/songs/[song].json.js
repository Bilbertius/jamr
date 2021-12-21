import { apiSong } from './_apiSong.js';


export const get = async (request) => {
    const { song } = request.params;
    const res = await apiSong(request, `/${song}`)
    if (res.status === 200) {
        return res;
    }
}
