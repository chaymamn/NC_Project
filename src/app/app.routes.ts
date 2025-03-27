import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'ncList',
    loadComponent: () => import('./nc-list/nc-list.component').then(m => m.NCListComponent),
  },
  {
    path: 'creation-non-conformity',
    loadComponent: () => import('./non-conformity/creation-non-conformity/creation-non-conformity.component').then(m => m.CreationNonConformityComponent),
  },
  {
    path: 'menu',
    loadComponent: () =>import('./non-conformity/menu/menu.component').then(m =>m.MenuPage),
  },
  {
    path: 'details',
    loadComponent: () =>import('./non-conformity/details/details.component').then(m =>m.DetailsComponent ),
  },
  {
    path: '',
    redirectTo: 'ncList',
    pathMatch: 'full',
  },
  {
    path: '**', // Handle unknown routes
    redirectTo: 'ncList',
  },
];
