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

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    CommonAppModuleModule, IonicModule, WelcomeBarComponent
  ]
})
export class TaskFormComponent  implements OnInit {

  formGroup!: FormGroup;
  categoriesToShow: any[] = [];
  tasksToSave: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
  ) {
    this.formGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit() {
    this.initStorage();
    this.cargarCategorias();
  }

  async initStorage() {
    await this.storage.create(); // Crea o recupera la instancia del storage
    const savedTasks = await this.storage.get('tasks');
    this.tasksToSave = savedTasks || [];
  }

  async cargarCategorias() {
    //if (!this.storageReady) return;
    const stored = await this.storage.get('categories');
    this.categoriesToShow = stored || [];
  }

  async agregarTarea() {
    const stored = await this.storage.get('tasks');
    const tasks = stored || [];
  
    // Generar un ID único (puede ser incremental)
    const newId = tasks.length > 0
      ? Math.max(...tasks.map((t: any) => t.id ?? 0)) + 1
      : 1;

    // Valida si el formulario está correcto para tomar los datos
    if (this.formGroup.valid) {
      const nuevaTarea = this.formGroup.value;
      const tarea = {
        id: newId,
        ...nuevaTarea,
        completed: false,
      };

      tasks.push(tarea);
    
      // Inserta los datos a tasks de manera local
      await this.storage.set('tasks', tasks);
      this.tasksToSave = tasks;

      // Mostrar confirmación o error del proceso
      console.log('Tarea guardada:', nuevaTarea);

      // Limpiar el formulario si deseas
      this.formGroup.reset();
    } else {
      console.log('Formulario inválido');
    }
  }
  
}
