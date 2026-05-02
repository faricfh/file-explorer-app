import type { Request, Response, NextFunction } from "express";
import type z from "zod";
import { errorResponse } from "@/utils/response";

export const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body ?? {},
      params: req.params ?? {},
      query: req.query ?? {},
    });
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path[issue.path.length - 1],
        message: issue.message,
      }));

      return errorResponse(res, "Validation failed", 400, errors);
    }

    next();
  };
};
