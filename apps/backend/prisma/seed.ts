import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

type FolderNode = {
  name: string;
  children?: FolderNode[];
};

const folderTree: FolderNode[] = [
  {
    name: "Documents",
    children: [
      {
        name: "Work",
        children: [{ name: "Reports" }, { name: "Invoices" }],
      },
      { name: "Personal" },
    ],
  },
  {
    name: "Pictures",
    children: [{ name: "Travel" }, { name: "Family" }],
  },
  {
    name: "Videos",
  },
];

let count = 0;

async function createFolder(node: FolderNode, parentId: number | null = null) {
  const folder = await prisma.folder.create({
    data: {
      name: node.name,
      parentId,
    },
  });

  count++;

  if (node.children) {
    for (const child of node.children) {
      await createFolder(child, folder.id);
    }
  }
}

async function main() {
  console.log("Starting folder seeding...");

  for (const root of folderTree) {
    await createFolder(root, null);
  }

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
