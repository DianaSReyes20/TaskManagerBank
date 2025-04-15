// src/app/data/repositories/impl/storage-task.repository.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../../../domain/models/task.model';
import { TaskRepository } from '../task.repository';

@Injectable({
  providedIn: 'root'
})
export class StorageTaskRepository implements TaskRepository {
  private readonly STORAGE_KEY = 'tasks';

  constructor(private storage: Storage) {}

  async getTasks(): Promise<Task[]> {
    await this.storage.create();
    return (await this.storage.get(this.STORAGE_KEY)) || [];
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    await this.storage.set(this.STORAGE_KEY, tasks);
  }

  async addTask(task: Task): Promise<void> {
    const tasks = await this.getTasks();
    tasks.push(task);
    await this.saveTasks(tasks);
  }
}