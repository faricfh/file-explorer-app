type Folder = {
  id: number;
  name: string;
  parentId: number | null;
};

type FolderTreeResponse = {
  id: number;
  name: string;
  children: FolderTreeResponse[];
};

type ChildrenMap = Map<number | null, Folder[]>;

export const buildTree = (folders: Folder[]): FolderTreeResponse[] => {
  const childrenMap: ChildrenMap = new Map();

  folders.forEach((folder) => {
    const key = folder.parentId;
    if (!childrenMap.has(key)) {
      childrenMap.set(key, []);
    }

    childrenMap.get(key)!.push(folder);
  });

  return buildTreeRecursive(null, childrenMap);
};

const buildTreeRecursive = (
  parentId: number | null,
  childrenMap: ChildrenMap,
): FolderTreeResponse[] => {
  const children = childrenMap.get(parentId) || [];

  return children.map((folder) => ({
    id: folder.id,
    name: folder.name,
    children: buildTreeRecursive(folder.id, childrenMap),
  }));
};
