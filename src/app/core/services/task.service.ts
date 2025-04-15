import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../../domain/models/task.model';
import { TaskRepository } from '../../data/repositories/task.repository';
import { StorageTaskRepository } from '../../data/repositories/implementaciones/storage.task.repository';

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    const storage = inject(Storage); // <-- Ahora es el tipo correcto
    const repo = new StorageTaskRepository(storage);
    return new TaskService(repo);
  }
})
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.getTasks();
  }

  async addTask(task: Omit<Task, 'id' | 'completed'>): Promise<Task> {
    const tasks = await this.taskRepository.getTasks();
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    
    const newTask: Task = {
      id: newId,
      ...task,
      completed: false
    };

    await this.taskRepository.addTask(newTask);
    return newTask;
  }

  // Eliminar tarea
  async deleteTask(id: number): Promise<void> {
    let tasks = await this.getTasks();
    tasks = tasks.filter(c => c.id !== id);
    await this.taskRepository.saveTasks(tasks);
  }
}