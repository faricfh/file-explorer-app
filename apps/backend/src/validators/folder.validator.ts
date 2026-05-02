import z from "zod";
import { createValidator } from "./base.validator";

const idParamSchema = {
  id: z.coerce.number("ID must be a number"),
};

const folderBodySchema = {
  name: z.string().min(1, "Name cannot be empty"),
  parentId: z.number("Parent ID must be a number").nullish(),
};

export const createFolderValidator = createValidator({
  body: folderBodySchema,
});

export const updateFolderValidator = createValidator({
  params: idParamSchema,
  body: {
    name: folderBodySchema.name.optional(),
    parentId: folderBodySchema.parentId,
  },
});

export const folderParamsValidator = createValidator({
  params: idParamSchema,
});
