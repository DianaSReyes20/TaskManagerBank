import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { NavigationService } from "../../../domain/services/navigation.service"
import { WelcomeBarComponent } from "../../components/shared/welcome-bar/welcome-bar.component";
import { CategoryService } from '../../../core/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../domain/models/category.model'
import { StorageCategoryRepository } from '../../../data/repositories/implementaciones/storage.category.repository';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    ReactiveFormsModule,
    WelcomeBarComponent
  ],
})
export class CategoryFormComponent implements OnInit {
  formGroup: FormGroup;
  categoriesToShow: Category[] = [];
  isEditing: boolean = false;
  currentCategoryId: number | null = null;
  modo: any;
  id_edit: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    public navigation: NavigationService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      prioridad: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.loadCategories();
    
    this.route.queryParams.subscribe(params => {
      this.modo = params['modo'];

      if (params['id'] && params['nombre']) {
        this.isEditing = true;
        this.currentCategoryId = +params['id'];
        
        this.formGroup.patchValue({
          name: params['nombre'],
          prioridad: params['prioridad']
        });
      }
    });
  }

  async loadCategories() {
    this.categoriesToShow = await this.categoryService.getCategories();
  }

  async saveCategory() {
    if (this.formGroup.valid) {
      try {
        const categoryData = this.formGroup.value;
        
        if (this.isEditing && this.currentCategoryId) {
          // Actualizar categoría existente
          await this.categoryService.updateCategory(
            this.currentCategoryId, 
            categoryData
          );
          console.log('Categoría actualizada');
        } else {
          // Crear nueva categoría
          await this.categoryService.addCategory(categoryData);
          console.log('Categoría creada');
        }
        
        this.formGroup.reset();
        this.loadCategories();
        this.router.navigate(['/home']); // Redirige después de guardar
      } catch (error) {
        console.error('Error al guardar categoría:', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  async eliminarCategoria(id: number) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await this.categoryService.deleteCategory(id);
        this.loadCategories();
        
        // Si estamos editando la categoría que se eliminó
        if (this.isEditing && this.currentCategoryId === id) {
          this.formGroup.reset();
          this.isEditing = false;
          this.currentCategoryId = null;
          this.router.navigate(['/home']);
        }
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
      }
    }
  }

  getColor(prioridad: string | undefined): string {
    if (!prioridad) return 'gray';
    
    switch (prioridad) {
      case 'Alta':
        return 'red';
      case 'Media':
        return 'orange';
      case 'Baja':
        return 'green';
      default:
        return 'gray';
    }
  }
}