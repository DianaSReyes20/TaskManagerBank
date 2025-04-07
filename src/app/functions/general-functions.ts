import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// Decorador para capturar el contexto de llamada
// Decorador para capturar el contexto de llamada
function LogContext(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
}
@Injectable({
  providedIn: 'root',
})
export class GeneralFunctions {
  constructor(
    private router: Router
  ) {}

  public goTo(route: string, params: any) {
    this.router.navigate([route], params);
  }
}
