// src/app/data/repositories/impl/storage-task.repository.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from '../../../domain/models/category.model';
import { CategoryRepository } from '../category.repository';

@Injectable({
  providedIn: 'root'
})
export class StorageCategoryRepository implements CategoryRepository {
  private readonly STORAGE_KEY = 'categories';

  constructor(private storage: Storage) {}

  async getCategories(): Promise<Category[]> {
    await this.storage.create();
    return (await this.storage.get(this.STORAGE_KEY)) || [];
  }

  async saveCategories(category: Category[]): Promise<void> {
    await this.storage.set(this.STORAGE_KEY, category);
  }

  async addCategory(category: Category): Promise<void> {
    const categories = await this.getCategories();
    categories.push(category);
    await this.saveCategories(categories);
  }
}