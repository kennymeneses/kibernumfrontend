import { Routes } from '@angular/router';
import {authGuard} from "./security/auth.guard";

export const routes: Routes = [

  {
    path: '',
    loadChildren: ()=> import('./pages/public/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/public/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'contacts',
    canActivate: [authGuard],
    loadChildren: ()=> import('./pages/private/contacts/contacts.component').then(m => m.ContactsComponent)
  }
];
