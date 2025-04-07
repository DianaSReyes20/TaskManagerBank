import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { CommonAppModuleModule } from "../../common-app-module/common-app-module";
import { HomePageRoutingModule } from './home-routing.module';
import { TaskFormComponent } from '../task-form/task-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CommonAppModuleModule,
    TaskFormComponent,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
