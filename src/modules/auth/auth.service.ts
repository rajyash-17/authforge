import argon2 from "argon2";
import {eq} from "drizzle-orm";

import {db} from '../../db';
import { users } from "../../db/schema/users";

import type { SignupInput } from "./auth.validation";

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
        
        return user;
    }
}

export const authService=new AuthService();