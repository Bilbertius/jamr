import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function apiAlbum(request, resource, data) {

    let body = {};
    let status = 400;

    switch (request.method.toUpperCase()) {


      // *********************** GET *************************//
        case 'GET':
            body = await prisma.band.findUnique({
                where: {
                    name: request.params.band
                },
                include: {
                    albums: {
                        select: {
                            name: true,
                            id: true,
                            songs: {
                                select: {
                                    id: true,
                                    name: true,
                                    jams: {
                                        select: {
                                            show: {
                                                select: {
                                                    id: true,
                                                    info: true,
                                                    date: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            status = 200;
            break;

      // *********************** Post *************************//
        case 'POST':
            body = await prisma.show.create({
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

    if (request.method !== 'GET' && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/explore'
            }
        };
    } else {
        return {
            status,
            body
        };
    }
}
