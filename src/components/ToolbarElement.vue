<script setup lang="ts">
import { computed } from 'vue'
import type { ShapeElement, ShapeType } from '../types'

const props = withDefaults(
  defineProps<{
    selectedElement?: ShapeElement | null
    disableAdd?: boolean
  }>(),
  {
    selectedElement: null,
    disableAdd: false,
  },
)

const emit = defineEmits<{
  (event: 'add-shape', shapeType: ShapeType): void
  (event: 'delete-selected'): void
  (event: 'toggle-lock-selected', nextLocked: boolean): void
}>()

const hasSelection = computed(() => Boolean(props.selectedElement))

function addShape(shapeType: ShapeType) {
  if (props.disableAdd) {
    return
  }
  emit('add-shape', shapeType)
}

function deleteSelected() {
  if (!hasSelection.value) {
    return
  }
  emit('delete-selected')
}
</script>

<template>
  <section
    class="flex flex-wrap items-center gap-2 rounded-lg border border-slate-300 bg-white p-3 shadow-sm"
    role="toolbar"
    aria-label="Canvas element toolbar"
  >
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="disableAdd"
        aria-label="Add rectangle"
        @click="addShape('rectangle')"
      >
        Add Rectangle
      </button>
      <button
        type="button"
        class="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="disableAdd"
        aria-label="Add circle"
        @click="addShape('circle')"
      >
        Add Circle
      </button>
    </div>

    <div class="mx-1 h-6 w-px bg-slate-300" aria-hidden="true" />

    <div class="flex items-center gap-2">
      <button
        type="button"
        class="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="!hasSelection"
        :aria-disabled="!hasSelection"
        @click="deleteSelected"
      >
        Delete
      </button>
    </div>
  </section>
</template>
