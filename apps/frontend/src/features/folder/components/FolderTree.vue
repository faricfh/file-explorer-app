<script setup lang="ts">
import type { FolderTree } from '@/features/folder/types/folder.type'
import FolderTreeItem from '@/features/folder/components/FolderTreeItem.vue'

defineProps<{
  nodes: FolderTree[]
  selectedFolder: FolderTree | null
  openFolderIds: Set<number>
}>()

defineEmits<{
  selectFolder: [folder: FolderTree]
  editFolder: [folder: FolderTree]
  deleteFolder: [folder: FolderTree]
  toggleFolder: [id: number]
}>()
</script>

<template>
  <div class="folder-tree">
    <FolderTreeItem
      v-for="node in nodes"
      :key="node.id"
      :node="node"
      :selectedFolder="selectedFolder"
      :openFolderIds="openFolderIds"
      @selectFolder="$emit('selectFolder', $event)"
      @editFolder="$emit('editFolder', $event)"
      @deleteFolder="$emit('deleteFolder', $event)"
      @toggleFolder="$emit('toggleFolder', $event)"
    />
  </div>
</template>
