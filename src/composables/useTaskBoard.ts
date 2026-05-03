import { ref } from 'vue'
import type { Task } from '@/types'

export function useTaskBoard() {
  const tasks = ref<Task[]>([])

  function addTask(taskInput: Omit<Task, 'id'>) {
    const task: Task = {
      id: crypto.randomUUID(),
      title: taskInput.title,
      status: taskInput.status,
      description: taskInput.description,
      priority: taskInput.priority,
    }

    tasks.value = [...tasks.value, task]
    return task
  }

  return { tasks, addTask }
}
