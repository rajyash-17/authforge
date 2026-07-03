// src/shared/dto/user-response.dto.ts

import { users } from "../../db/schema/users";

export type User = typeof users.$inferSelect;

export class UserResponseDto {
    static from(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };
    }
}