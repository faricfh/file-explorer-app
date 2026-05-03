<script setup lang="ts">
import type { FolderTree } from '@/features/folder/types/folder.type'
import { computed } from 'vue'

const props = defineProps<{
  node: FolderTree
  selectedFolder: FolderTree | null
  openFolderIds: Set<number>
}>()

const emit = defineEmits<{
  selectFolder: [folder: FolderTree]
  editFolder: [folder: FolderTree]
  deleteFolder: [folder: FolderTree]
  toggleFolder: [id: number]
}>()

const isOpen = computed(() => props.openFolderIds.has(props.node.id))

const handleSelect = (selectedNode: FolderTree) => {
  emit('selectFolder', selectedNode)
}
</script>

<template>
  <div
    class="folder-tree-item"
    :class="{ 'folder-tree-item--active': selectedFolder?.id === node.id }"
    @click="handleSelect(node)"
  >
    <span
      v-if="node.children.length"
      class="folder-tree-item__toggle"
      @click.stop="$emit('toggleFolder', node.id)"
    >
      {{ isOpen ? '▼' : '▶' }}
    </span>
    <span v-else class="folder-tree-item__toggle"></span>
    <span class="folder-tree-item__name">{{ node.name }}</span>
    <div class="folder-tree-item__actions">
      <button class="folder-tree-item__btn" @click.stop="$emit('editFolder', node)">✏️</button>
      <button class="folder-tree-item__btn" @click.stop="$emit('deleteFolder', node)">🗑️</button>
    </div>
  </div>
  <div v-if="isOpen && node.children.length" class="folder-tree-item__children">
    <FolderTreeItem
      v-for="child in node.children"
      :key="child.id"
      :node="child"
      :selectedFolder="selectedFolder"
      :openFolderIds="openFolderIds"
      @selectFolder="emit('selectFolder', $event)"
      @editFolder="$emit('editFolder', $event)"
      @deleteFolder="$emit('deleteFolder', $event)"
      @toggleFolder="$emit('toggleFolder', $event)"
    />
  </div>
</template>
