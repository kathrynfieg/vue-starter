<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { TASK_DRAG_MIME } from '@/composables/useTaskBoard'
import type { Task, TaskStatus } from '@/types'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  dropped: [draggedTaskId: string]
  update: [updates: { title: string; description: string }]
}>()

const isEditing = ref(false)
const draftTitle = ref('')
const draftDescription = ref('')
const titleInputRef = ref<HTMLInputElement | null>(null)

const taskStatusTitles: Record<TaskStatus, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}

function enterEdit() {
  draftTitle.value = props.task.title
  draftDescription.value = props.task.description ?? ''
  isEditing.value = true
  nextTick(() => {
    titleInputRef.value?.focus()
    titleInputRef.value?.select()
  })
}

function cancelEdit() {
  isEditing.value = false
}

function saveEdit() {
  const title = draftTitle.value.trim()
  if (!title) return
  emit('update', {
    title: draftTitle.value,
    description: draftDescription.value,
  })
  isEditing.value = false
}

function onDragStart(e: DragEvent) {
  if (isEditing.value) {
    e.preventDefault()
    return
  }
  const dt = e.dataTransfer
  if (!dt) return
  dt.setData(TASK_DRAG_MIME, props.task.id)
  dt.effectAllowed = 'move'
}

function onDrop(e: DragEvent) {
  const id = e.dataTransfer?.getData(TASK_DRAG_MIME)
  if (!id) return
  emit('dropped', id)
  e.stopPropagation()
}
</script>

<template>
  <article
    :draggable="!isEditing"
    class="rounded-lg border border-neutral-200 bg-white p-3 shadow-sm ring-neutral-900/5"
    :class="isEditing ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'"
    @dragstart="onDragStart"
    @dragover.prevent
    @drop.prevent="onDrop"
  >
    <template v-if="isEditing">
      <label class="sr-only" :for="`task-title-${task.id}`">Title</label>
      <input
        :id="`task-title-${task.id}`"
        ref="titleInputRef"
        v-model="draftTitle"
        type="text"
        class="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm font-semibold text-neutral-900 outline-none ring-neutral-400 focus:ring-2"
        @keydown.escape="cancelEdit"
      />
      <label class="sr-only" :for="`task-desc-${task.id}`">Description</label>
      <textarea
        :id="`task-desc-${task.id}`"
        v-model="draftDescription"
        rows="3"
        placeholder="Description (optional)"
        class="mt-2 w-full resize-y rounded-md border border-neutral-300 px-2 py-1.5 text-sm text-neutral-800 outline-none ring-neutral-400 focus:ring-2"
        @keydown.escape="cancelEdit"
      />
      <div class="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800"
          @click="saveEdit"
        >
          Save
        </button>
        <button
          type="button"
          class="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
          @click="cancelEdit"
        >
          Cancel
        </button>
      </div>
    </template>

    <template v-else>
      <h3
        class="font-semibold text-neutral-900"
        title="Double-click to edit"
        @dblclick.stop="enterEdit"
      >
        {{ task.title }}
      </h3>
      <p
        class="mt-1 text-sm text-neutral-600"
        :class="task.description ? 'line-clamp-2' : 'text-neutral-400'"
        title="Double-click to edit"
        @dblclick.stop="enterEdit"
      >
        {{ task.description || 'Add description…' }}
      </p>
      <div class="mt-2 flex flex-wrap items-center gap-2">
        <span
          class="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium capitalize text-neutral-700"
        >
          {{ taskStatusTitles[task.status] }}
        </span>
        <span
          v-if="task.priority"
          class="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium capitalize text-amber-900 ring-1 ring-amber-200/80 ring-inset"
        >
          {{ task.priority }}
        </span>
      </div>
    </template>
  </article>
</template>
