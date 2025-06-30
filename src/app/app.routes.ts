import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { redirectIfLoggedIn } from './guards/redirect-if-logged-in.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./home/home.component').then(m => m.HomeComponent);
        },
    },
    {
        path: 'todos',
        canActivate: [authGuard], // Ensure the user is authenticated before accessing this route
        loadComponent: () => {
            return import('./todos/todos.component').then(m => m.TodosComponent);
        },
    },
    {
        path: 'login',
        canActivate: [redirectIfLoggedIn],
        loadComponent: () => {
            return import('./components/login/login.component').then(m => m.LoginComponent);
        }
    },
    {
        path: 'register',
        canActivate: [redirectIfLoggedIn],
        loadComponent: () => {
            return import('./components/register/register.component').then(m => m.RegisterComponent);
        }
    },
];
