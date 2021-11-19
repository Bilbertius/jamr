
import { PrismaClient } from "@prisma/client"
const prisma  = new PrismaClient();


export async function apiBand(request, resource, data) {

  let body = {};
  let status = 400;

  switch (request.method.toUpperCase()) {
    case "DELETE":
      await prisma.band.delete({
        where: {
          id: resource.split("/").pop()
        }
      });
      status = 200;
      break;
    case "GET":
      body = await prisma.band.findFirst({
        where : {
          name: resource.split("/").pop(),
        },
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
          },
          shows: {
            select: {
              info: true,

            }
          }
        },
      });

      status = 200;
      break;

    case "POST":


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
  } else {

    return {
      status,
      body
  };
  }

}