import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  //? para la carga de datos
  isLoading: boolean = true;
  taskToShow: any[] = [];

  constructor() {
    this.taskToShow = [
      { id: 1, title: 'Atender cliente en caja', completed: false, category: 'Caja' },
      { id: 2, title: 'Revisar solicitud de préstamo', completed: true, category: 'Préstamo' },
      { id: 3, title: 'Ofrecer nuevo producto de ahorro', completed: false, category: 'Nuevo producto' },
      { id: 4, title: 'Atender cliente en caja', completed: false, category: 'Caja' },
      { id: 5, title: 'Revisar solicitud de préstamo', completed: true, category: 'Préstamo' },
      { id: 6, title: 'Ofrecer nuevo producto de ahorro', completed: false, category: 'Nuevo producto' }
    ];
    this.isLoading = false;
  }

}
