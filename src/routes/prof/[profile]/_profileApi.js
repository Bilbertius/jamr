import prisma from '$lib/client.js';


export async function apiProfile(request, resource, data) {
    let body = {};
    let status = 400;
   
    switch (request.method.toUpperCase()) {
        case 'DELETE':
                body = await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: resource.split('/')[3],
                        followingId: resource.split('/')[2]
                    }
                }
            });
            status = 200;
            break;
        case 'GET':
            body = await prisma.userProfile.findUnique({
                where: {
                    username: resource.split('/').pop()
                },
                select: {
                    id: true,
                    username: true,
                    comments: {
                        include: {
                            jam: {
                                include: {
                                    show: true
                                }
                            }
                        }
                    },
                    votes: {
                        include: {
                            jam: {
                                include: {
                                    show: true
                                }
                            }
                        }
                    },
                    followers:{
                        select : {
                            followingId: true
                        },
                    },
                    following: {
                        select: {
                            followerId: true
                        }
                    }

                }
            });

            status = 200;
            break;
        case 'POST':


            body = await prisma.follows.create({
                data: {
                    followerId: data.follower,
                    followingId: data.following
                },
                select: {
                    followerId: true,
                    followingId: true
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