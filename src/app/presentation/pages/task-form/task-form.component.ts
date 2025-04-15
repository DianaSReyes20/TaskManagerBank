import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { TaskService } from '../../../core/services/task.service';
import { CategoryService } from '../../../core/services/category.service';
import { Task } from '../../../domain/models/task.model';
import { Category } from '../../../domain/models/category.model';
import { IonicModule } from '@ionic/angular';
import { WelcomeBarComponent } from "../../components/shared/welcome-bar/welcome-bar.component";
import { CommonModule } from '@angular/common';
import { StorageTaskRepository } from '../../../data/repositories/implementaciones/storage.task.repository';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule, 
    ReactiveFormsModule,
    WelcomeBarComponent
  ],
})
export class TaskFormComponent implements OnInit {
  formGroup: FormGroup;
  categoriesToShow: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    this.categoriesToShow = await this.categoryService.getCategories();
  }

  async agregarTarea() {
    if (this.formGroup.valid) {
      try {
        const newTask = await this.taskService.addTask(this.formGroup.value);
        console.log('Tarea guardada:', newTask);
        this.formGroup.reset();
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al guardar tarea:', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}