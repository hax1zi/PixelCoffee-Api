import { PrismaClient } from "@prisma/client";
import { Router, type Request, type Response } from "express";

const coffee = Router();
const prisma = new PrismaClient();

coffee.get("/", async (req: Request, res: Response) => {
    try {
        const coffees = await prisma.coffee.findMany({
            where: {
                SKU: {
                    startsWith: "CAF-",
                    mode: "insensitive",
                },
            },
        });

        if (!coffees) {
            return res.status(404).json({ error: "Café nao encontrado" });
        }

        return res.status(200).json(coffees);
    } catch {
        return res
            .status(404)
            .json({ error: "Erro ao se conectar ao banco de dados" });
    }
});

export default coffee;
