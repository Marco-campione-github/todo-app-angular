import { Routes } from '@angular/router';

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
        loadComponent: () => {
            return import('./todos/todos.component').then(m => m.TodosComponent);
        },
    },
    {
        path: 'login',
        loadComponent: () => {
            return import('./components/login/login.component').then(m => m.LoginComponent);
        }
    },
    {
        path: 'register',
        loadComponent: () => {
            return import('./components/register/register.component').then(m => m.RegisterComponent);
        }
    },
];
