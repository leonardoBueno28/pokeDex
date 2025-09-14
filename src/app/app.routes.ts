import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'add-pokemon',
    loadComponent: () =>
      import('./components/pokemon-form/pokemon-form.component').then(
        (m) => m.PokemonFormComponent
      ),
  },
];
