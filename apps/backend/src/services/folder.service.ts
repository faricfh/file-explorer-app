import prisma from "@/lib/prisma";

export const getAllFolders = () => {
  return prisma.folder.findMany();
};
