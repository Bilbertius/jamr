import { PrismaClient } from "@prisma/client";

const prisma= new PrismaClient();


export async function api(request, resource, data) {
  /*if (!request.locals.userid) {
    return {status: 401};
  }
*/
  let body = {};
  let status = 500;

  switch (request.method.toUpperCase()) {
    case "DELETE":
      await prisma.jam.delete({
        where: {
          id: resource.split("/").pop()
        }
      });
      status = 200;
      break;
    case "GET":
      body = await prisma.band.findMany({
        select: {
          id: true,
          name: true,
          albums: {
            select: {
              id: true,
              name: true,
              bandId: true,
              songs: {
                select: {
                  id: true,
                  name: true,
                  albumId: true
                }
              }
            }
          }
        }
      });
      status = 200;
      break;

    case "POST":
      if (data.song) {

        body = await prisma.album.update({
          where: {
            id: data.albumId
          },
          data: {
            songs: {
              create: {
                name: data.song,
                band: {
                  connect: {
                    id: data.bandId
                  }
                }
              }
            }
          }
        });
      } else {

        body = await prisma.band.update({
          where: {
            id: data.band
          },
          data: {
            albums: {
              create: {
                name: data.name,
                year_released: data.year_released
              }
            }
          }
        });
      }
      status = 201;
      break;
  }

  if (request.method !== "GET" && request.headers.accept !== "application/json") {
    return {
      status: 303,
      headers: {
        location: "/explore"
      }
    };
  }
  return {
    status,
    body
  };

}