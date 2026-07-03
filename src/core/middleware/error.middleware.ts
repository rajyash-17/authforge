import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
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