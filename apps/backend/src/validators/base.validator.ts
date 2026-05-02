import { z } from "zod";

type SchemaInput = {
  body?: z.ZodRawShape;
  params?: z.ZodRawShape;
  query?: z.ZodRawShape;
};

export const createValidator = ({ body, params, query }: SchemaInput) =>
  z.object({
    ...(body && { body: z.object(body) }),
    ...(params && { params: z.object(params) }),
    ...(query && { query: z.object(query) }),
  });
