import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function apiJam(request, resource, data) {

    let body = {};
    let status = 400;

    switch (request.method.toUpperCase()) {

      // *********************** GET *************************//
        case 'GET':
            body = await prisma.jam.findUnique({
                where: { id : request.params.jam },
                select : {
                    id: true,
                    song: true,
                    show: true,
                    votes: true,
                    comments: {
                        select: {
                            text: true,
                            user: true,
                            date_posted: true

                        }
                    }
                }

            });
            status = 200;
            break;

      // *********************** Post *************************//
        case 'POST':
            body = await prisma.comment.create({
                data : {
                    jamId: resource.split('/').pop(),
                    text: data.text,
                    userId: data.userid
                },
                select : {
                    text: true,
                    user: true,
                    date_posted: true
                }

            })

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