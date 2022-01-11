import prisma from '$lib/client';

export async function apiShow(request, resource, data) {

    let body = {};
    let status = 400;

    switch (request.method.toUpperCase()) {

      // *********************** GET *************************//
        case 'GET':
            body = await prisma.band.findUnique({
                where: { name: request.params.band },
                include: {
                    shows: {
                        select: {
                            id: true,
                            date: true,
                            info: true,
                            jams: {
                                select: {
                                    id: true,
                                    song: true,
                                    votes: {
                                        select: {
                                            rating: true,
                                            userId: true,
                                            jamId: true
                                        }
                                    },
                                    comments: {
                                        select: {
                                            text: true,
                                            date_posted: true,
                                            user: true
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
        case'POST':
            body = await prisma.comment.create({
                data: {

                    text: data.text
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