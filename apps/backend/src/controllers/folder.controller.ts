import type { Request, Response } from "express";
import * as folderService from "@/services/folder.service";
import { successResponse } from "@/utils/response";

export const getFolders = async (req: Request, res: Response) => {
  const folders = await folderService.getFolders();
  return successResponse(res, folders, "Folders fetched successfully");
};

export const getFolderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const folder = await folderService.getFolderById(Number(id));
  return successResponse(res, folder, "Folder fetched successfully");
};

export const createFolder = async (req: Request, res: Response) => {
  const { name, parentId } = req.body;
  const folder = await folderService.createFolder(name, parentId);
  return successResponse(res, folder, "Folder created", 201);
};

export const updateFolder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, parentId } = req.body;
  const folder = await folderService.updateFolder(Number(id), name, parentId);
  return successResponse(res, folder, "Folder updated successfully");
};

export const deleteFolder = async (req: Request, res: Response) => {
  const { id } = req.params;
  await folderService.deleteFolder(Number(id));
  return successResponse(res, null, "Folder deleted successfully");
};

export const getFolderTree = async (_req: Request, res: Response) => {
  const tree = await folderService.getFolderTree();
  return successResponse(res, tree, "Folder tree fetched successfully");
};
