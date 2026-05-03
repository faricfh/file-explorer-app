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
  const openFolderIds = ref<Set<number>>(new Set())

  function toggleFolder(id: number) {
    if (openFolderIds.value.has(id)) {
      openFolderIds.value.delete(id)
    } else {
      openFolderIds.value.add(id)
    }
  }

  async function fetchFolderTree(options?: { silent?: boolean }) {
    if (!options?.silent) {
      isLoading.value = true
    }

    error.value = null

    try {
      const response = await folderService.getTree()
      folderTree.value = response.data

      if (selectedFolder.value) {
        selectedFolder.value = findFolder(response.data, selectedFolder.value.id) ?? null
      }
    } catch (err: unknown) {
      error.value = (err as ApiError).message
    } finally {
      if (!options?.silent) {
        isLoading.value = false
      }
    }
  }

  function selectFolder(folder: FolderTree) {
    selectedFolder.value = folder
  }

  async function createFolder(payload: CreateFolderPayload) {
    error.value = null

    try {
      await folderService.create(payload)
      await fetchFolderTree({ silent: true })
    } catch (err) {
      error.value = (err as ApiError).message
    }
  }

  async function updateFolder(id: number, payload: UpdateFolderPayload) {
    error.value = null

    try {
      await folderService.update(id, payload)
      await fetchFolderTree({ silent: true })
    } catch (err) {
      error.value = (err as ApiError).message
    }
  }

  async function deleteFolder(id: number) {
    error.value = null

    try {
      await folderService.delete(id)
      await fetchFolderTree({ silent: true })
    } catch (err) {
      error.value = (err as ApiError).message
    }
  }

  return {
    folderTree,
    selectedFolder,
    isLoading,
    error,
    openFolderIds,
    fetchFolderTree,
    selectFolder,
    createFolder,
    updateFolder,
    deleteFolder,
    toggleFolder,
  }
}

function findFolder(folders: FolderTree[], id: number): FolderTree | null {
  for (const folder of folders) {
    if (folder.id === id) return folder
    const found = findFolder(folder.children, id)
    if (found) return found
  }
  return null
}
