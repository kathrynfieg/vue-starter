<!-- 
TODO:
project: Drag-and-Drop Task Board
description: lightweight task board similar to a simple Trello/Jira board

core features:
- display columns: todo, in progress, done
- display tasks: title, description?, status, id, priority?
- drag and drop tasks between columns - button based is acceptable
- add, edit, delete tasks

nice to have:
- reorder tasks within a column
- filter/search tasks
- empty states
-->

<script setup lang="ts">
import TaskCard from './components/TaskCard.vue'
import { useTaskBoard } from './composables/useTaskBoard'
import type { TaskStatus } from '@/types'

const { tasks, columns, addTask } = useTaskBoard()

function handleAddTask(status: TaskStatus) {
  addTask({
    title: 'New Task',
    description: 'New Task Description',
    status,
  })
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900">Task board</h1>
        <p class="mt-1 text-sm text-neutral-600">
          {{ tasks.length }} task{{ tasks.length === 1 ? '' : 's' }} total
        </p>
      </div>
    </header>

    <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:items-start">
      <section
        v-for="col in columns"
        :key="col.status"
        class="flex min-h-48 flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-3 shadow-sm"
      >
        <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 class="text-sm font-semibold tracking-wide text-neutral-800">
            {{ col.title }}
          </h2>
          <div class="flex items-center gap-2">
            <span
              class="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-neutral-600 ring-1 ring-neutral-200/80"
            >
              {{ col.tasks.length }}
            </span>
            <button
              type="button"
              class="rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-neutral-800"
              @click="handleAddTask(col.status)"
            >
              Add
            </button>
          </div>
        </div>

        <ul v-if="col.tasks.length > 0" class="flex list-none flex-col gap-2 p-0">
          <li v-for="task in col.tasks" :key="task.id">
            <TaskCard :task="task" />
          </li>
        </ul>
        <p
          v-else
          class="mt-auto rounded-lg border border-dashed border-neutral-300 bg-white/60 py-6 text-center text-sm text-neutral-500"
        >
          No tasks yet
        </p>
      </section>
    </div>
  </div>
</template>
