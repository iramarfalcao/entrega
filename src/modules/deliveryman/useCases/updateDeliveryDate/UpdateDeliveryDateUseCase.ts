import { prisma } from "../../../../database/prismaClient";

interface IUpdateDelivery {
    id_delivery: string;
    id_deliveryman: string;
}

export class UpdateDeliveryDateUseCase {

    async execute({ id_delivery, id_deliveryman }: IUpdateDelivery) {

        // V1
        // const result = await prisma.deliveries.updateMany({
        //     where: {
        //         id: id_delivery,
        //         id_deliveryman: id_deliveryman
        //     },
        //     data: {
        //         delivery_date: new Date()
        //     }
        // });

        const delivery = await prisma.deliveries.findFirst({
            where: {
                id: id_delivery,
                id_deliveryman: id_deliveryman
            }
        });

        const result = await prisma.deliveries.update({
            where: {
                id: delivery?.id,
            },
            data: {
                delivery_date: new Date()
            }
        });

        return result;
    }
}