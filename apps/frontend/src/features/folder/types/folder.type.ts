export interface Folder {
  id: number
  name: string
  parentId: number | null
  children: Folder[]
}

export interface FolderTree {
  id: number
  name: string
  children: FolderTree[]
}

export type CreateFolderPayload = Pick<Folder, 'name' | 'parentId'>
export type UpdateFolderPayload = Partial<CreateFolderPayload>
