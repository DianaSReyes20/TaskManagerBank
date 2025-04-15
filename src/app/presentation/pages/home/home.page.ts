import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavigationService } from "../../../domain/services/navigation.service"
import { WelcomeBarComponent } from "../../../presentation/components/shared/welcome-bar/welcome-bar.component";
import { Storage } from '@ionic/storage-angular';
import { TaskService } from '../../../core/services/task.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { getFirestore, enableNetwork } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, WelcomeBarComponent, FormsModule], // 👈 AQUI IMPORTANTE
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoading: boolean = true;
  tasksToShow: any[] = [];
  tasksToShowFiltered: any[] = [];
  filtroSeleccionado: 'todas' | 'completadas' | 'pendientes' = 'todas';
  mostrarListadoCategorias: boolean = false;

  constructor(
    public navigation: NavigationService,
    private storage: Storage,
    private taskService: TaskService,
    private firestore: Firestore
  ) {
    // this.tasksToShow = [
    //   { id: 1, title: 'Atender cliente en caja', completed: false, category: 'Caja' },
    //   { id: 2, title: 'Revisar solicitud de préstamo', completed: true, category: 'Préstamo' },
    //   { id: 3, title: 'Ofrecer nuevo producto de ahorro', completed: false, category: 'Nuevo producto' },
    //   { id: 4, title: 'Atender cliente en caja', completed: false, category: 'Caja' },
    //   { id: 5, title: 'Revisar solicitud de préstamo', completed: true, category: 'Préstamo' },
    //   { id: 6, title: 'Ofrecer nuevo producto de ahorro', completed: false, category: 'Nuevo producto' }
    // ];
    this.isLoading = false;
    this.cargarTareas();
    //this.obtenerFlagDeFirestore();
  }

  ngOnInit() {
    this.cargarTareas();
    this.filtroSeleccionado = 'todas';
    this.filtrarTareas();
  }

  async cargarTareas() {
    this.tasksToShow = await this.taskService.getTasks();
    this.tasksToShowFiltered = await this.taskService.getTasks();
  }

  async eliminarTarea(taskId: number) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await this.taskService.deleteTask(taskId);
        this.tasksToShow = this.tasksToShow.filter(t => t.id !== taskId);
        this.filtrarTareas();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  }
  
  filtrarTareas() {
    switch(this.filtroSeleccionado) {
      case 'completadas':
        this.tasksToShowFiltered = this.tasksToShow.filter(t => t.completed);
        break;
      case 'pendientes':
        this.tasksToShowFiltered = this.tasksToShow.filter(t => !t.completed);
        break;
      case 'todas':
      default:
        this.tasksToShowFiltered = [...this.tasksToShow];
        break;
    }
  }

  async cambiarEstado(task: any) {
    // Alternar el estado
    task.completed = !task.completed;
  
    // Obtener tareas actuales
    const stored = await this.storage.get('tasks');
    const tasks = stored || [];
  
    // Buscar y actualizar la tarea respectiva en la lista
    const index = tasks.findIndex((t: any) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      await this.storage.set('tasks', tasks); // Guardar cambios
    }
  
    // Refrescar la lista visual si es necesario
    this.tasksToShow = tasks;

    this.cargarTareas();
  }
  
  async obtenerFlagDeFirestore() {
    const db = getFirestore();
    enableNetwork(db)
      .then(() => console.log("Firestore online"))
      .catch((err) => console.error("Error al activar red de Firestore:", err));

    const docRef = doc(this.firestore, 'flags/home');
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data();
      this.mostrarListadoCategorias = data['mostrarListadoCategorias'] ?? false;
    }
  }
}
