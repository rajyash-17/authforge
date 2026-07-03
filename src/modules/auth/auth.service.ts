
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
    }
}

export const authService=new AuthService();