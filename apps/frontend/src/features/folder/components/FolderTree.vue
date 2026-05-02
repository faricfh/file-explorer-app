<script setup lang="ts">
import type { FolderTree } from '@/features/folder/types/folder.type'
import FolderTreeItem from '@/features/folder/components/FolderTreeItem.vue'

defineProps<{
  nodes: FolderTree[]
  selectedFolder: FolderTree | null
}>()

defineEmits<{
  selectFolder: [folder: FolderTree]
}>()
</script>

<template>
  <div class="folder-tree">
    <FolderTreeItem
      v-for="node in nodes"
      :key="node.id"
      :node="node"
      :selectedFolder="selectedFolder"
      @selectFolder="$emit('selectFolder', $event)"
    />
  </div>
</template>
