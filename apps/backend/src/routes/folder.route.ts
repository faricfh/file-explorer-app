import express from "express";
import {
  createFolder,
  deleteFolder,
  getFolders,
  updateFolder,
  getFolderById,
  getFolderTree,
} from "@/controllers/folder.controller";
import { validate } from "@/middleware/validate.middleware";
import {
  createFolderValidator,
  folderParamsValidator,
  updateFolderValidator,
} from "@/validators/folder.validator";

const folderRoutes = express.Router();

folderRoutes.get("/folders", getFolders);
folderRoutes.get("/folders/tree", getFolderTree);
folderRoutes.get(
  "/folders/:id",
  validate(folderParamsValidator),
  getFolderById,
);
folderRoutes.post("/folders", validate(createFolderValidator), createFolder);
folderRoutes.put("/folders/:id", validate(updateFolderValidator), updateFolder);
folderRoutes.delete(
  "/folders/:id",
  validate(folderParamsValidator),
  deleteFolder,
);

export default folderRoutes;
