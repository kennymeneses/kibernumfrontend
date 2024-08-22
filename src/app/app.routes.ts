import { Routes } from '@angular/router';
import {authGuard} from "./security/auth.guard";

export const routes: Routes = [

  {
    path: '',
    loadComponent: ()=> import('./pages/public/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/public/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'contacts',
    //canActivate: [authGuard],
    loadComponent: ()=> import('./pages/private/contacts/contacts.component').then(m => m.ContactsComponent)
  }
];
