export interface Task {
  taskId: number;
  title: string;
  description?: string;
  dueDate?: string;
  isCompleted: boolean;
  categoryId: number;
  categoryName?: string;
}