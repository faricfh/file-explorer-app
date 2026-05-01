import type { Request, Response } from "express";
import * as folderService from "@/services/folder.service";
import { errorResponse, successResponse } from "@/utils/response";

export const getFolders = async (req: Request, res: Response) => {
  try {
    const folders = await folderService.getAllFolders();
    return successResponse(res, folders, "Folders fetched successfully");
  } catch (error) {
    return errorResponse(res, "An error occurred while fetching folders.", 500);
  }
};