// Modelo de Tarea
export interface Task {
    id: number;
    title: string;
    completed: boolean;
    categoryId?: number;
}
  