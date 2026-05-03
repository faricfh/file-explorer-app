<script setup lang="ts">
import type { CreateFolderPayload, FolderTree } from '@/features/folder/types/folder.type'
import { ref } from 'vue'
import FolderModal from '@/features/folder/components/FolderModal.vue'

const props = defineProps<{
  selectedFolder: FolderTree | null
}>()

const emit = defineEmits<{
  createFolder: [payload: CreateFolderPayload]
}>()

const isModalOpen = ref(false)

function handleSubmit(name: string) {
  emit('createFolder', { name: name, parentId: props.selectedFolder?.id })
  isModalOpen.value = false
}
</script>

<template>
  <div class="right-panel">
    <div class="right-panel__header">
      <span>{{ selectedFolder ? selectedFolder.name : 'Select a folder' }}</span>
      <button v-if="selectedFolder" class="add-btn" @click="isModalOpen = true">
        + Subfolder
      </button>
    </div>
    <div class="right-panel__content">
      <p v-if="!selectedFolder">No folder selected.</p>
      <div v-else>
        <div v-for="child in selectedFolder.children" :key="child.id" class="right-panel__item">
          <span class="right-panel__icon">📁</span>
          <span>{{ child.name }}</span>
        </div>
        <div v-if="!selectedFolder.children.length">This folder is empty</div>
      </div>
    </div>
  </div>

  <FolderModal
    :isOpen="isModalOpen"
    title="Create Subfolder"
    @close="isModalOpen = false"
    @submit="handleSubmit"
  />
</template>
