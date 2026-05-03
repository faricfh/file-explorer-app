<script setup lang="ts">
import FolderModal from '@/features/folder/components/FolderModal.vue'
import LeftPanel from '@/features/folder/components/LeftPanel.vue'
import RightPanel from '@/features/folder/components/RightPanel.vue'
import { useFolder } from '@/features/folder/composables/useFolder'
import type { FolderTree } from '@/features/folder/types/folder.type'
import { onMounted, ref } from 'vue'

const {
  folderTree,
  selectedFolder,
  isLoading,
  openFolderIds,
  fetchFolderTree,
  selectFolder,
  createFolder,
  updateFolder,
  deleteFolder,
  toggleFolder,
} = useFolder()

onMounted(() => {
  fetchFolderTree()
})

const isEditModalOpen = ref(false)
const editingFolder = ref<FolderTree | null>(null)

function handleEditFolder(folder: FolderTree) {
  editingFolder.value = folder
  isEditModalOpen.value = true
}

async function handleEditSubmit(name: string) {
  if (!editingFolder.value) return
  await updateFolder(editingFolder.value.id, { name })
  isEditModalOpen.value = false
  editingFolder.value = null
}

async function handleDeleteFolder(folder: FolderTree) {
  if (!confirm(`Delete "${folder.name}"?`)) return
  await deleteFolder(folder.id)
}
</script>

<template>
  <div class="explorer">
    <LeftPanel
      :folderTree="folderTree"
      :selectedFolder="selectedFolder"
      :isLoading="isLoading"
      :openFolderIds="openFolderIds"
      @selectFolder="selectFolder"
      @createFolder="createFolder"
      @editFolder="handleEditFolder"
      @deleteFolder="handleDeleteFolder"
      @toggleFolder="toggleFolder"
    />
    <RightPanel :selectedFolder="selectedFolder" @createFolder="createFolder" />
  </div>

  <FolderModal
    :isOpen="isEditModalOpen"
    :initialName="editingFolder?.name"
    title="Edit Folder"
    @close="isEditModalOpen = false"
    @submit="handleEditSubmit"
  />
</template>
