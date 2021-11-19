

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function apiProfile(request, resource, data) {
    let body = {};
    let status = 400;

    switch (request.method.toUpperCase()) {
        case 'DELETE':
            await prisma.userProfile.delete({
                where: {
                    email: resource.split('/').pop()
                }
            });
            status = 200;
            break;
        case 'GET':
            body = await prisma.userProfile.findUnique({
                where: {
                    username: resource.slice(1)
                },
                select: {
                    id: true,
                    username: true,
                    comments: true,
                    votes: true
                }
            });

            status = 200;
            break;

        case 'POST':
            body = await prisma.userProfile.create({
                data: {
                    id: request.locals.user.issuer,
                    username: data.username,
                    email: data.email
                },
                select: {
                    id: true,
                    username: true,
                    email: true

                }
            });
            status = 200;
            break;
    }


    if (request.method !== 'GET' && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: `/${data.username}`
            }
        };
    } else {

        return {
            status,
            body
        };
    }

}