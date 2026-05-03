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

const { tasks, addTask } = useTaskBoard()

function handleAddTask() {
  addTask({
    title: 'New Task',
    description: 'New Task Description',
    status: 'in_progress',
  })
}
</script>

<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <p class="mt-2 text-neutral-600">Tasks: {{ tasks.length }}</p>
  <button @click="handleAddTask">Add Task</button>
  <ul class="mt-4 list-none space-y-2 p-0">
    <li v-for="task in tasks" :key="task.id">
      <TaskCard :task="task" />
    </li>
  </ul>
</template>
