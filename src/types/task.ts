export type TaskStatus = 'todo' | 'in_progress' | 'done'

export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  status: TaskStatus
  description?: string
  priority?: Priority
}
