import express from "express";
import { getFolders } from "@/controllers/folder.controller";

const folderRoutes = express.Router();

folderRoutes.get("/folders", getFolders);

export default folderRoutes;
