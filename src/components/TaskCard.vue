<script setup lang="ts">
import type { Task, TaskStatus } from '@/types'

defineProps<{
  task: Task
}>()

const taskStatusMap: Record<TaskStatus, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}
</script>

<template>
  <article class="rounded-lg border border-neutral-200 bg-white p-3 shadow-sm ring-neutral-900/5">
    <h3 class="font-semibold text-neutral-900">{{ task.title }}</h3>
    <p v-if="task.description" class="mt-1 line-clamp-2 text-sm text-neutral-600">
      {{ task.description }}
    </p>
    <div class="mt-2 flex flex-wrap items-center gap-2">
      <span
        class="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium capitalize text-neutral-700"
      >
        {{ taskStatusMap[task.status] }}
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
