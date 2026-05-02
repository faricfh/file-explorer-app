<script setup lang="ts">
import type { FolderTree } from '@/features/folder/types/folder.type'
import { ref } from 'vue'

defineProps<{
  node: FolderTree
  selectedFolder: FolderTree | null
}>()

const emit = defineEmits<{
  selectFolder: [folder: FolderTree]
}>()

const isOpen = ref(false)
const toggle = () => {
  isOpen.value = !isOpen.value
}

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
    <span v-if="node.children.length" class="folder-tree-item__toggle" @click.stop="toggle">
      {{ isOpen ? '▼' : '▶' }}
    </span>
    <span v-else class="folder-tree-item__toggle"></span>
    <span class="folder-tree-item__name">{{ node.name }}</span>
  </div>
  <div v-if="isOpen && node.children.length" class="folder-tree-item__children">
    <FolderTreeItem
      v-for="child in node.children"
      :key="child.id"
      :node="child"
      :selectedFolder="selectedFolder"
      @selectFolder="emit('selectFolder', $event)"
    />
  </div>
</template>
