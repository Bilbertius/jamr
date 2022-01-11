import { PrismaClient } from "@prisma/client"
const prisma  = new PrismaClient();


export async function apiUser(request, resource, data) {

	let body = {};
	let status = 400;
	console.log({"locals" : request.locals, "resource":  resource.split("/").pop(), "data" : data})
	switch (request.method.toUpperCase()) {
		case "DELETE":
			await prisma.userProfile.delete({
				where: {
					email: resource.split("/").pop()
				}
			});
			status = 200;
			break;
		case "GET":
			body = await prisma.userProfile.findFirst({
				where : {
					email: resource.split("/").pop()
				},
				select: {
					id:true,
					email: true,
					username: true,
					comments: {
						include: {
							jam : {
								include: {
									show: true,
									song: true
								}
							}
						}
					},
					votes: true,
					followers: true,
					following: true
				}
			});

			status = 200;
			break;

		case "POST":

			body = await prisma.userProfile.create({
				data: {
					id: request.locals.user.issuer,
					username: data.username,
					email: request.locals.user.email
				},
				select: {
					id:true,
					username: true,
					email:true,

				}
			})
			status = 200;
			break;
	}


	if (request.method !== "GET" && request.headers.accept !== "application/json") {
		return {
			status: 303,
			headers: {
				location: `/${data.email}`
			}
		};
	} else {

		return {
			status,
			body
		};
	}

}