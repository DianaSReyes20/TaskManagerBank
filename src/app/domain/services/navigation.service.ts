// navigation.service.ts
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateTo(route: string, extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate([route], extras);
  }
}