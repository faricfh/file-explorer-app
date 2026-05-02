import { api } from '@/lib/api'
import type { ApiResponse } from '@/types/api.type'
import type {
  Folder,
  CreateFolderPayload,
  UpdateFolderPayload,
  FolderTree,
} from '@/features/folder/types/folder.type'

export const folderService = {
  async getTree(): Promise<ApiResponse<FolderTree[]>> {
    return api.get('/folders/tree')
  },

  async getById(id: number): Promise<ApiResponse<Folder>> {
    return api.get(`/folders/${id}`)
  },

  async create(payload: CreateFolderPayload): Promise<ApiResponse<Folder>> {
    return api.post('/folders', payload)
  },

  async update(id: number, payload: UpdateFolderPayload): Promise<ApiResponse<Folder>> {
    return api.patch(`/folders/${id}`, payload)
  },

  async delete(id: number): Promise<ApiResponse<void>> {
    return api.delete(`/folders/${id}`)
  },
}
