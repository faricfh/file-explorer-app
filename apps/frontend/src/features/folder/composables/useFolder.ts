import { ref } from 'vue'
import type {
  CreateFolderPayload,
  FolderTree,
  UpdateFolderPayload,
} from '@/features/folder/types/folder.type'
import { folderService } from '@/features/folder/services/folder.service'
import type { ApiError } from '@/types/api.type'

export function useFolder() {
  const folderTree = ref<FolderTree[]>([])
  const selectedFolder = ref<FolderTree | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchFolderTree() {
    isLoading.value = true
    error.value = null

    try {
      const response = await folderService.getTree()
      folderTree.value = response.data
    } catch (err: unknown) {
      error.value = (err as ApiError).message
    } finally {
      isLoading.value = false
    }
  }

  function selectFolder(folder: FolderTree) {
    selectedFolder.value = folder
  }

  async function createFolder(payload: CreateFolderPayload) {
    isLoading.value = true
    error.value = null

    try {
      await folderService.create(payload)
      await fetchFolderTree()
    } catch (err) {
      error.value = (err as ApiError).message
    } finally {
      isLoading.value = false
    }
  }

  async function updateFolder(id: number, payload: UpdateFolderPayload) {
    isLoading.value = true
    error.value = null

    try {
      await folderService.update(id, payload)
      await fetchFolderTree()
    } catch (err) {
      error.value = (err as ApiError).message
    } finally {
      isLoading.value = false
    }
  }

  async function deleteFolder(id: number) {
    isLoading.value = true
    error.value = null

    try {
      await folderService.delete(id)
      await fetchFolderTree()
    } catch (err) {
      error.value = (err as ApiError).message
    } finally {
      isLoading.value = false
    }
  }

  return {
    folderTree,
    selectedFolder,
    isLoading,
    error,
    fetchFolderTree,
    selectFolder,
    createFolder,
    updateFolder,
    deleteFolder,
  }
}
