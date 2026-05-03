<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
  initialName?: string
  title: string
}>()

const emit = defineEmits<{
  close: []
  submit: [name: string]
}>()

const name = ref(props.initialName ?? '')

watch(
  () => props.isOpen,
  (val) => {
    if (val) name.value = props.initialName ?? ''
  },
)

function handleSubmit() {
  if (!name.value.trim()) return
  emit('submit', name.value.trim())
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
    <div class="modal">
      <div class="modal__header">
        <span>{{ title }}</span>
      </div>
      <div class="modal__body">
        <input
          v-model="name"
          class="modal__input"
          type="text"
          placeholder="Folder name"
          @keyup.enter="handleSubmit"
        />
      </div>
      <div class="modal__footer">
        <button class="modal__btn modal__btn--cancel" @click="handleClose">Cancel</button>
        <button class="modal__btn modal__btn--save" @click="handleSubmit">Save</button>
      </div>
    </div>
  </div>
</template>
