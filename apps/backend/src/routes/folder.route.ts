import express, { type Request, type Response } from "express";
import prisma from "@/lib/prisma";

const folderRoutes = express.Router();

folderRoutes.get("/folders", async (req: Request, res: Response) => {
  try {
    const folders = await prisma.folder.findMany();
    res.json({
      success: true,
      data: folders,
    });
  } catch (error) {
    console.error("Error fetching folders:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching folders.",
    });
  }
});

export default folderRoutes;
