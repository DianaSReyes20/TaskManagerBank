import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CommonAppModuleModule } from "../../common-app-module/common-app-module";
import { GeneralFunctions } from "../../functions/general-functions"
import { WelcomeBarComponent } from "../partials/welcome-bar/welcome-bar.component";
import { Storage } from '@ionic/storage-angular';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { getFirestore, enableNetwork } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, CommonAppModuleModule, WelcomeBarComponent], // 👈 AQUI IMPORTANTE
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoading: boolean = true;
  tasksToShow: any[] = [];
  tasksToShowFiltered: any[] = [];
  filtroSeleccionado: string = 'todas';
  mostrarListadoCategorias: boolean = false;

  constructor(
    public general: GeneralFunctions,
    private storage: Storage,
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
    this.obtenerFlagDeFirestore();
  }

  ngOnInit() {
    this.initStorage();
    this.cargarTareas();
    this.filtrarTareas();
  }

  async initStorage() {
    await this.storage.create(); // Crea o recupera la instancia del storage
  }

  async cargarTareas() {
    //if (!this.storageReady) return;
    const stored = await this.storage.get('tasks');
    this.tasksToShow = stored || [];
  }

  async eliminarTarea(id: number) {
    // Filtra la tarea que se quiere eliminar por su id
    this.tasksToShow = this.tasksToShow.filter(task => task.id !== id);
  
    // Actualiza el storage con el cambio realizado
    await this.storage.set('tasks', this.tasksToShow);
  }
  
  filtrarTareas() {
    if (this.filtroSeleccionado === 'todas') {
      this.cargarTareas();
      this.tasksToShow = [...this.tasksToShow];
    } else if (this.filtroSeleccionado === 'completadas') {
      this.tasksToShow = this.tasksToShow.filter(t => t.completed);
    } else if (this.filtroSeleccionado === 'pendientes') {
      this.tasksToShow = this.tasksToShow.filter(t => !t.completed);
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
