<script setup lang="ts">
import type { FolderTree } from '@/features/folder/types/folder.type'

defineProps<{
  selectedFolder: FolderTree | null
}>()
</script>

<template>
  <div class="right-panel">
    <div class="right-panel__header">
      <span>{{ selectedFolder ? selectedFolder.name : 'Select a folder' }}</span>
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
</template>
