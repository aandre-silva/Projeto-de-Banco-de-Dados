import { getCustomRepository } from "typeorm";

import { compare  } from "bcryptjs";

 import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne ({
            email
        });

        if (!user) {
            throw new Error ("Email/Password Incorrect");
        }

        const passwordMatch = await compare (password, user.password);

        if (!passwordMatch) {
            throw new Error ("Email/Password Incorrect");
        }

        const token = sign ({
            email: user.email
        }, "88e55bac1b3cab315ad67a2a1b5dfc80", {
            subject : user.id, 
            expiresIn: "1d"
        });

        return token;
    }
}


export { AuthenticateUserService }