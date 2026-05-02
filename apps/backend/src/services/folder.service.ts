import prisma from "@/lib/prisma";
import { AppError } from "@/utils/app-error";
import { buildTree } from "@/utils/build-tree";

const findFolderOrThrow = async (id: number) => {
  const folder = await prisma.folder.findUnique({ where: { id } });
  if (!folder) throw new AppError("Folder not found", 404);
  return folder;
};

export const getFolders = () => {
  return prisma.folder.findMany({
    orderBy: { name: "asc" },
  });
};

export const getFolderById = (id: number) => {
  return findFolderOrThrow(id);
};

export const createFolder = async (name: string, parentId?: number) => {
  return prisma.folder.create({
    data: { name, parentId },
  });
};

export const updateFolder = async (
  id: number,
  name: string,
  parentId?: number,
) => {
  if (id === parentId) {
    throw new AppError("Folder cannot be its own parent", 400);
  }

  await findFolderOrThrow(id);

  return prisma.folder.update({
    where: { id },
    data: { name, parentId },
  });
};

export const deleteFolder = async (id: number) => {
  await findFolderOrThrow(id);
  return prisma.folder.delete({ where: { id } });
};

export const getFolderTree = async () => {
  const folders = await prisma.folder.findMany({
    orderBy: { name: "asc" },
  });
  return buildTree(folders);
};
