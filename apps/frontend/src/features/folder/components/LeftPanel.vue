<script setup lang="ts">
import type { FolderTree as FolderTreeType } from '@/features/folder/types/folder.type'
import FolderTree from '@/features/folder/components/FolderTree.vue'

defineProps<{
  folderTree: FolderTreeType[]
  selectedFolder: FolderTreeType | null
  isLoading: boolean
}>()

defineEmits<{
  selectFolder: [folder: FolderTreeType]
}>()
</script>

<template>
  <div class="left-panel">
    <div class="left-panel__header">
      <span>Folders</span>
    </div>
    <div class="left-panel__content">
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <FolderTree
          :nodes="folderTree"
          :selectedFolder="selectedFolder"
          @selectFolder="$emit('selectFolder', $event)"
        />
      </div>
    </div>
  </div>
</template>
