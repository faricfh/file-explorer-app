<script setup lang="ts">
import LeftPanel from '@/features/folder/components/LeftPanel.vue'
import RightPanel from '@/features/folder/components/RightPanel.vue'
import { useFolder } from '@/features/folder/composables/useFolder'
import { onMounted } from 'vue'

const { folderTree, selectedFolder, isLoading, fetchFolderTree, selectFolder } = useFolder()

onMounted(() => {
  fetchFolderTree()
})
</script>

<template>
  <div class="explorer">
    <LeftPanel
      :folderTree="folderTree"
      :selectedFolder="selectedFolder"
      :isLoading="isLoading"
      @selectFolder="selectFolder"
    />
    <RightPanel :selectedFolder="selectedFolder" />
  </div>
</template>
