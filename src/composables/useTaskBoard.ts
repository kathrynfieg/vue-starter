import { computed, ref } from 'vue'
import type { Task, TaskStatus } from '@/types'

interface BoardColumn {
  status: TaskStatus
  title: string
}

export const BOARD_COLUMNS: BoardColumn[] = [
  { status: 'todo', title: 'To do' },
  { status: 'in_progress', title: 'In progress' },
  { status: 'done', title: 'Done' },
]

export function useTaskBoard() {
  const tasks = ref<Task[]>([])

  const columns = computed(() =>
    BOARD_COLUMNS.map((col) => ({
      ...col,
      tasks: tasks.value.filter((t) => t.status === col.status),
    })),
  )

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

  return { tasks, columns, addTask }
}
