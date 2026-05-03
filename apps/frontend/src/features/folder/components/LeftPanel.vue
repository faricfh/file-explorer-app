<script setup lang="ts">
import type {
  CreateFolderPayload,
  FolderTree as FolderTreeType,
} from '@/features/folder/types/folder.type'
import FolderTree from '@/features/folder/components/FolderTree.vue'
import { ref } from 'vue'
import FolderModal from '@/features/folder/components/FolderModal.vue'

defineProps<{
  folderTree: FolderTreeType[]
  selectedFolder: FolderTreeType | null
  isLoading: boolean
  openFolderIds: Set<number>
}>()

const emit = defineEmits<{
  selectFolder: [folder: FolderTreeType]
  createFolder: [payload: CreateFolderPayload]
  editFolder: [folder: FolderTreeType]
  deleteFolder: [folder: FolderTreeType]
  toggleFolder: [id: number]
}>()

const isModalOpen = ref(false)

function handleSubmit(name: string) {
  emit('createFolder', { name: name, parentId: null })
  isModalOpen.value = false
}
</script>

<template>
  <div class="left-panel">
    <div class="left-panel__header">
      <span>Folders</span>
      <button class="add-btn" @click="isModalOpen = true">+ Folder</button>
    </div>
    <div class="left-panel__content">
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <div v-if="!folderTree.length">
          No folders available
        </div>

        <FolderTree
          v-else
          :nodes="folderTree"
          :selectedFolder="selectedFolder"
          :openFolderIds="openFolderIds"
          @selectFolder="$emit('selectFolder', $event)"
          @editFolder="$emit('editFolder', $event)"
          @deleteFolder="$emit('deleteFolder', $event)"
          @toggleFolder="$emit('toggleFolder', $event)"
        />
      </div>
    </div>
  </div>

  <FolderModal
    :isOpen="isModalOpen"
    title="Create Folder"
    @submit="handleSubmit"
    @close="isModalOpen = false"
  />
</template>
