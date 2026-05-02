import type { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";
import { errorResponse } from "@/utils/response";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode);
  }

  console.error(err);
  return errorResponse(res, "Internal server error", 500);
};