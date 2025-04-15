import { Task } from '../../domain/models/task.model';

export abstract class TaskRepository {
  abstract getTasks(): Promise<Task[]>;
  abstract saveTasks(tasks: Task[]): Promise<void>;
  abstract addTask(task: Task): Promise<void>;
}