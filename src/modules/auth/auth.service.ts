import type { SignupInput } from "./auth.validation";

export class AuthService{
    async signup(data:SignupInput){}
}

export const authService=new AuthService();