import { prisma } from "../../../../database/prismaClient";

export class FindAllAvailableUseCase {

    async execute() {

        const deliveries = await prisma.deliveries.findMany({
            where: {
                id_deliveryman: null,
                delivery_date: null
            }
        });

        return deliveries;
    }
}