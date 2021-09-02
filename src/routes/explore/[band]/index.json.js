import { apiBand } from "./_apiBand.js";

export const get = async (request) => {
  const { band } = request.params;
  const res = await apiBand(request, `/${band}`)
  if (res.status === 200) {
    return res;
  }
}





export const post = async (request) => {
  let res= await api(request, `/${request.params}`, {
      venue: request.body.get('venue'),
      city: request.body.get('city'),
      show_date: new Date(request.body.get('date'))
  });
  return res;
};


