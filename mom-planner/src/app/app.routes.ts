import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'recipes',
    loadComponent: () => import('./recipes/recipes.component').then(m => m.RecipesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'activities',
    loadComponent: () => import('./activities/activities.component').then(m => m.ActivitiesComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/home' }
];
