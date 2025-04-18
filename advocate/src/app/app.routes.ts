import { Routes } from '@angular/router';
import { LandingPageComponent } from './resources/landing-page/landing-page.component';

export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  loadComponent: () => {
    return import('./resources/landing-page/landing-page.component').then((m)=> m.LandingPageComponent)
  },
},
  {
  path: 'login',
  loadComponent: () => {
    return import('./resources/login/login.component').then((m)=> m.LoginComponent)
      }
  }
];
