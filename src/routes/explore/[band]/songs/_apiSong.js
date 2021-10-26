import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function apiSong(request, resource, data) {
    /*if (!request.locals.userid) {
     return {status: 401};
     }
     */
    let body = {};
    let status = 500;

        console.log('SONG')
    switch (request.method.toUpperCase()) {
        case 'GET':
            body = await prisma.song.findUnique({
                where: {
                    id: resource.split('/').pop()
                },
                select: {
                    id: true,
                    name: true,
                    album: true,
                    band: true,
                    jams: {
                        include: {
                            show: true,
                            votes: true
                        }
                    }
                }
            });
            status = 200;
            break;

        case 'POST':


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

    if (request.method !== 'GET' && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/explore'
            }
        };
    }
    console.log(body);
    return {
        status,
        body
    };

}