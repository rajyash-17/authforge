import argon2 from "argon2";
import {eq} from "drizzle-orm";

import {db} from '../../db';
import { users } from "../../db/schema/users";

import type { LoginInput,SignupInput } from "./auth.validation";
import {UnauthorizedError} from "../../core/errors/unauthorized-error";
import { email } from "zod";

import {UserResponseDto} from "../../shared/dto/user-response.dto";
import verify from "argon2";

export class AuthService{
    async signup(data:SignupInput){
        const existingUser=await db.query.users.findFirst({
            where: eq(users.email,data.email)
        });
        if(existingUser){
            throw new Error("Email already Exists");
        }

        const passwordHash= await argon2.hash(data.password);
        console.log(passwordHash);

        const[user]=await db
            .insert(users)
            .values({
                name:data.name,
                email:data.email,
                passwordHash,
            })
            .returning();
        
        return UserResponseDto.from(user);
    }

    async login(data:LoginInput){
        const user=await db.query.users.findFirst({
            where: eq(users.email,data.email)
        });

        if(!user){
            throw new UnauthorizedError("Invalid email or password");

        }

        const isPasswordValid=await argon2.verify(user.passwordHash,data.password);

        if(!isPasswordValid){
            throw new UnauthorizedError("invalid email or password");
        }

        return UserResponseDto.from(user);
    }
}

export const authService=new AuthService();