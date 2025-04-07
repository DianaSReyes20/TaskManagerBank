

import { NgModule, Type, inject } from '@angular/core';
import {
  CanActivateFn,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./views/home/home.page').then(
        (m) => m.HomePage,
      ),
  },
  {
    path: 'task-form',
    loadComponent: () =>
      import('./views/task-form/task-form.component').then(
        (m) => m.TaskFormComponent,
      ),
  },
  {
    path: 'category-form',
    loadComponent: () =>
      import('./views/category-form/category-form.component').then(
        (m) => m.CategoryFormComponent,
      ),
  },
];

routes.push(
  //Ruta de navegacion erronea, esta ruta siempre debe de ir al final de este arreglo.
  { path: '**', redirectTo: 'unavailable', pathMatch: 'full' },
);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}