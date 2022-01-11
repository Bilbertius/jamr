import prisma from '$lib/client';

export async function apiVote(request, resource, data) {

    let body = {};
    let status = 400;

    switch (request.method.toUpperCase()) {

      // *********************** GET *************************//
        case 'GET':
            body = await prisma.vote.getMany({
                where: { jamId: request.params.jam },
                select: {
                    jamId: true,
                    rating: true,
                    userId: true
                }
            });
            status = 200;
            break;

      // *********************** Post *************************//
        case 'POST':
            body = await prisma.vote.upsert({
                where: {
                    userId_jamId: {
                        userId: request.locals.user.issuer,
                        jamId: request.params.jamId
                    }
                },
                update: { rating: parseInt(data.rating) },
                create: {
                    rating: parseInt(data.rating),
                    userId: request.locals.user.issuer,
                    jamId: request.params.jamId
                },
                select: {
                    jamId: true,
                    user: true,
                    rating: true

                }

            });

            status = 201;

            break;
    }

    if (request.method !== 'GET' && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: `/explore/Papadosio/shows/jams/${request.params.jamId}`
            }
        };
    } else {
        return {
            status,
            body
        };
    }
}