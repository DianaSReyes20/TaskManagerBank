import { Category } from '../../domain/models/category.model';

export abstract class CategoryRepository {
  abstract getCategories(): Promise<Category[]>;
  abstract saveCategories(categories: Category[]): Promise<void>;
  abstract addCategory(category: Category): Promise<void>;
}