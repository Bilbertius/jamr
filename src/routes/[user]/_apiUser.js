import { PrismaClient } from "@prisma/client"
const prisma  = new PrismaClient();


export async function apiUser(request, resource, data) {

	let body = {};
	let status = 400;
	console.log(request)
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
					email: request.params.user,
				},
				select: {
					id:true,
					email: true,
					username: true
								}
			});

			status = 200;
			break;

		case "POST":
			body = await prisma.userProfile.create({
				data: {
					username: data.username,
					email: data.email
				}
			})
			console.log(body)

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

};