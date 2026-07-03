import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error";
import { ZodError } from "zod";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            error: {
            message: "Validation Failed",
            fields: err.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
            },
        });
    }
    if (err instanceof AppError) {
    return res.status(err.statusCode).json({
        success: false,
        error: {
            message: err.message,
        },
        });
    }

    console.error(err);

    return res.status(500).json({
        success: false,
        error: {
        message: "Internal Server Error",
        },
    });
}