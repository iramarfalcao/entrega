import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}

export class AuthenticateDeliverymanUserCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {

        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        });

        if (!deliveryman) {
            throw new Error("Username or Password invalid!");
        }

        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error("Username or Password invalid!");
        }

        const token = sign({ username }, process.env.SECRET_WORD!!, {
            subject: deliveryman.id,
            expiresIn: "1d"
        });

        return token;
    }
}