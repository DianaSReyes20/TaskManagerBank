import { Component, OnInit } from '@angular/core';
import { CommonAppModuleModule } from "../../common-app-module/common-app-module";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WelcomeBarComponent } from "../partials/welcome-bar/welcome-bar.component";
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';
import { GeneralFunctions } from "../../functions/general-functions"

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  imports: [
    CommonAppModuleModule, IonicModule, WelcomeBarComponent
  ]
})
export class CategoryFormComponent  implements OnInit {
  formGroup!: FormGroup;
  categoryToSave: any[] = [];
  categoriesToShow: any[] = [];
  private storage_: Storage | null = null;
  modo: any;
  id_edit: number = 0;
  editar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private route: ActivatedRoute,
    public general: GeneralFunctions,
  ) {
    this.initForm();
    this.initStorage();
    this.cargarCategorias();
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.modo = params['modo'];
      
      if (params['nombre'] != "" && params['nombre'] != undefined){
        this.editar = this.modo === 'formulario' && !!params['id'];
        this.id_edit = +params['id'];
        this.formGroup.patchValue({
          name: params['nombre'],
          prioridad: params['prioridad']
        });
      }
    });
  }

  async initStorage() {
    this.storage_ = await this.storage.create();
    const savedCategories = await this.storage_.get('categories');
    this.categoryToSave = savedCategories || [];
  }
  
  initForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      prioridad: ['', Validators.required],
    });
  }

  async cargarCategorias() {
    //if (!this.storageReady) return;
    const stored = await this.storage.get('categories');
    this.categoriesToShow = stored || [];
  }

  async agregarCategoria() {
    const stored = await this.storage.get('categories');
    const categories = stored || [];
  
    // Generar un ID único (puede ser incremental)
    const newId = categories.length > 0
      ? Math.max(...categories.map((t: any) => t.id ?? 0)) + 1
      : 1;

    // Valida si el formulario está correcto para tomar los datos
    if (this.formGroup.valid) {
      const nuevaCategoria = this.formGroup.value;
      const categoria = {
        id: newId,
        ...nuevaCategoria,
      };

      categories.push(categoria);
    
      // Inserta los datos a categories de manera local
      await this.storage.set('categories', categories);
      this.categoryToSave = categories;

      // Mostrar confirmación o error del proceso
      console.log('Categoría guardada:', nuevaCategoria);

      // Limpiar el formulario si deseas
      this.formGroup.reset();
    } else {
      console.log('Formulario inválido');
    }
    this.cargarCategorias();
  }

  async editarCategoria(id: number) {
    // Obtener categorías actuales
    const categoriesSaved = await this.storage.get('categories') || [];
    
    // Buscar y actualizar la categoría respectiva en la lista
    const index = categoriesSaved.findIndex((cat: any) => cat.id === id);
    if (index !== -1) {
      const categoriaEditada = {
        id: id,
        name: this.formGroup.value.name,
        prioridad: this.formGroup.value.prioridad
      };
      
      categoriesSaved[index] = categoriaEditada; // Actualiza con los nuevos valores
      await this.storage.set('categories', categoriesSaved);
      console.log('Categoría actualizada:', this.formGroup.value);
    } else {
      console.error('Categoría no encontrada para actualizar');
    }

    this.cargarCategorias();
  }
  

  async eliminarCategoria(id: number) {
    // Filtra la tarea que se quiere eliminar por su id
    this.categoriesToShow = this.categoriesToShow.filter(task => task.id !== id);
  
    // Actualiza el storage con el cambio realizado
    await this.storage.set('categories', this.categoriesToShow);
  }
  
  // Función para obtener color según tipo de prioridad
  getColor(prioridad: string): string {
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
