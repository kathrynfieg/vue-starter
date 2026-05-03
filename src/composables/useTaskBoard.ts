import { useLocalStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { Task, TaskStatus } from '@/types'

const TASKS_STORAGE_KEY = 'vue-starter:task-board'

/** Payload key for HTML5 drag-and-drop (use `text/plain` for broad browser support) */
export const TASK_DRAG_MIME = 'text/plain'

interface BoardColumn {
  status: TaskStatus
  title: string
}

export const BOARD_COLUMNS: BoardColumn[] = [
  { status: 'todo', title: 'To do' },
  { status: 'in_progress', title: 'In progress' },
  { status: 'done', title: 'Done' },
]

function taskMatchesSearch(task: Task, query: string): boolean {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  if (task.title.toLowerCase().includes(needle)) return true
  if (task.description?.toLowerCase().includes(needle)) return true
  return false
}

export function useTaskBoard() {
  const tasks = useLocalStorage<Task[]>(TASKS_STORAGE_KEY, [])

  const searchQuery = ref('')

  const hasActiveSearchFilter = computed(
    () => searchQuery.value.trim().length > 0,
  )

  const columns = computed(() =>
    BOARD_COLUMNS.map((col) => ({
      ...col,
      tasks: tasks.value
        .filter((t) => t.status === col.status)
        .filter((t) => taskMatchesSearch(t, searchQuery.value)),
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

  function moveTask(taskId: string, newStatus: TaskStatus) {
    const task = tasks.value.find((task) => task.id === taskId)
    if (!task || task.status === newStatus) return

    tasks.value = tasks.value.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task,
    )
  }

  /** Updates title and/or description (empty description clears the field). */
  function updateTask(taskId: string, updates: { title: string; description: string }) {
    const title = updates.title.trim()
    if (!title) return

    const descriptionTrimmed = updates.description.trim()

    tasks.value = tasks.value.map((task) =>
      task.id === taskId
        ? {
            ...task,
            title,
            description: descriptionTrimmed === '' ? undefined : descriptionTrimmed,
          }
        : task,
    )
  }
  
  function searchTasks(query: string) {
    searchQuery.value = query
  }

  return {
    tasks,
    columns,
    addTask,
    moveTask,
    updateTask,
    searchQuery,
    hasActiveSearchFilter,
    searchTasks,
  }
}
