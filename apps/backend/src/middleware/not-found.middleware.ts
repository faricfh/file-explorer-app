import type { Request, Response } from "express";
import { errorResponse } from "@/utils/response";

export const notFound = (req: Request, res: Response) => {
  return errorResponse(res, `Cannot ${req.method} ${req.path}`, 404);
};
