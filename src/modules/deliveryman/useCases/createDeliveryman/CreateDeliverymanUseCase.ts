import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliverman {
    username: string;
    password: string;
}

export class CreateDeliverymanUseCase {

    async execute({ username, password }: ICreateDeliverman) {

        const deliverymanExist = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        });

        if (deliverymanExist) {
            throw new Error("Deliveryman already exists!");
        }

        const hashedPassword = await hash(password, 10);

        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        return deliveryman;
    }
}