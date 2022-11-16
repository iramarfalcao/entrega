import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesUseCase {

    async execute(id_client: string) {

        // V1
        // const deliveries = await prisma.clients.findMany({
        //     where: {
        //         id: id_client
        //     },
        //     include: {
        //         deliveries: true
        //     }
        // });

        const deliveries = await prisma.clients.findMany({
            where: {
                id: id_client
            },
            select: {
                id: true,
                username: true,
                deliveries: true
            }
        });

        return deliveries;
    }
}