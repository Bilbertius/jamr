

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function apiProfile(request, resource, data) {
    let body = {};
    let status = 400;

    switch (request.method.toUpperCase()) {
        case 'DELETE':
            await prisma.follows.delete({
                where: {
                    followed: {
                        connect: {
                            username:  resource.split('/').pop()
                        },
                    }, follower: {
                        connect : {
                            id : data.follower,
                        }
                    }
                }
            });
            status = 200;
            break;
        case 'GET':
            body = await prisma.userProfile.findUnique({
                where: {
                    username:  resource.split('/').pop()
                },
                select: {
                    id:true,
                    username: true,
                    comments: {
                        include: {
                            jam: {
                               include : {
                                   show: true
                               }
                            },

                        }
                    },
                    votes: {
                        include: {
                            jam: {
                                include: {
                                    show: true

                                }
                            },

                        }
                    },
                    followerOf: true,
                    followedBy: true


                }
            });

            status = 200;
            break;

        case 'POST':
            body = await prisma.follows.create({
                data: {
                    followed: {
                        connect: {
                            username:  resource.split('/').pop()

                        },
                    }, follower: {
                        connect : {
                            id : data.follower,
                        }

                    }
                },
                include: {
                    follower:true,
                    followed: true

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