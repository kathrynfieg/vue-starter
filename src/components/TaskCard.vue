<script setup lang="ts">
import { TASK_DRAG_MIME } from '@/composables/useTaskBoard'
import type { Task, TaskStatus } from '@/types'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  dropped: [draggedTaskId: string]
}>()

const taskStatusTitles: Record<TaskStatus, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}

function onDragStart(e: DragEvent) {
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
    draggable="true"
    class="cursor-grab rounded-lg border border-neutral-200 bg-white p-3 shadow-sm ring-neutral-900/5 active:cursor-grabbing"
    @dragstart="onDragStart"
    @dragover.prevent
    @drop.prevent="onDrop"
  >
    <h3 class="font-semibold text-neutral-900">{{ task.title }}</h3>
    <p v-if="task.description" class="mt-1 line-clamp-2 text-sm text-neutral-600">
      {{ task.description }}
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
  </article>
</template>
