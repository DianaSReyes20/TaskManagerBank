import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CommonAppModuleModule } from "../../common-app-module/common-app-module";
import { GeneralFunctions } from "../../functions/general-functions"
import { WelcomeBarComponent } from "../partials/welcome-bar/welcome-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, CommonAppModuleModule, WelcomeBarComponent], // 👈 AQUI IMPORTANTE
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoading: boolean = true;
  taskToShow: any[] = [];

  constructor(
    public general: GeneralFunctions
  ) {
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
