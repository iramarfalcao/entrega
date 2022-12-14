import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUserCase {
    async execute({ username, password }: IAuthenticateClient) {

        const client = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        });

        if (!client) {
            throw new Error("Username or Password invalid!");
        }

        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Username or Password invalid!");
        }

        const token = sign({ username }, process.env.SECRET_WORD!!, {
            subject: client.id,
            expiresIn: "1d"
        });

        return token;
    }
}