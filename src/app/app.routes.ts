import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // 👈 para redirigir al dashboard
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
];