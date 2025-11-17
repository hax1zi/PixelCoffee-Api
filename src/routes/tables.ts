import { PrismaClient } from "@prisma/client";
import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

const tables = Router();
const prisma = new PrismaClient();

tables.get("/sign-in", async (req: Request, res: Response) => {
    try {
        const { tableId } = req.body;

        if (!tableId) {
            return res.status(400).json({ error: "tableId é obrigatório" });
        }

        const table = await prisma.table.findUnique({
            where: { id: tableId },
        });

        if (!table) {
            return res.status(404).json({ error: "Mesa não encontrada" });
        }

        const token = jwt.sign(
            {
                tableId: table.id,
                tableNumber: table.tableNumber,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "3h" }
        );

        return res.json({
            message: "Mesa encontrada com sucesso",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao verificar mesa" });
    }
});

export default tables;
