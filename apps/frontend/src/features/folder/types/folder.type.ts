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

export type CreateFolderPayload = {
  name: string
  parentId?: number | null
}
export type UpdateFolderPayload = Partial<CreateFolderPayload>
