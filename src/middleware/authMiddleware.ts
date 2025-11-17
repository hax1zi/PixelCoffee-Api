import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    tableId: string;
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res
                .status(401)
                .json({ error: "Token de autenticação ausente" });
        }

        const [, token] = authHeader.split(" ");

        if (!token) {
            return res.status(401).json({ error: "Token inválido" });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        req.body.tableId = decoded.tableId;

        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
}
