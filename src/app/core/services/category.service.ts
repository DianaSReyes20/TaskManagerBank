import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // <-- Importa desde ionic/storage-angular
import { Category } from 'src/app/domain/models/category.model';
import { CategoryRepository } from '../../data/repositories/category.repository';
import { StorageCategoryRepository } from '../../data/repositories/implementaciones/storage.category.repository';

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    const storage = inject(Storage); // <-- Ahora es el tipo correcto
    const repo = new StorageCategoryRepository(storage);
    return new CategoryService(repo);
  }
})
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  // Traer todo el listado de categorías
  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.getCategories();
  }

  // Agregar una categoría nueva
  async addCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const categories = await this.categoryRepository.getCategories();
    const newId = categories.length > 0 ? Math.max(...categories.map(t => t.id)) + 1 : 1;
    
    const newCategory: Category = {
      id: newId,
      ...category,
    };

    await this.categoryRepository.addCategory(newCategory);
    return newCategory;
  }

   // Actualizar categoría existente
   async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category> {
    let categories = await this.getCategories();
    const index = categories.findIndex(c => c.id === id);

    if (index === -1) {
      throw new Error('Category not found');
    }

    const updatedCategory = {
      ...categories[index],
      ...categoryData,
      id // Aseguramos que no se modifique el ID
    };

    categories[index] = updatedCategory;
    await this.categoryRepository.saveCategories(categories);
    return updatedCategory;
  }

  // Eliminar categoría
  async deleteCategory(id: number): Promise<void> {
    let categories = await this.getCategories();
    categories = categories.filter(c => c.id !== id);
    await this.categoryRepository.saveCategories(categories);
  }
}