import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';

import { PokemonNavComponent } from './pokemon-nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { provideHttpClient } from '@angular/common/http';

describe('PokemonNavComponent', () => {
  let fixture: ComponentFixture<PokemonNavComponent>;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonNavComponent],
      providers: [
        provideHttpClient(),
        provideRouter([
          { path: 'dashboard', component: DashboardComponent },
          { path: 'add-pokemon', component: PokemonFormComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonNavComponent);
    fixture.detectChanges();

    harness = await RouterTestingHarness.create();
  });

  it('should have a "back to list" button that navigates to /dashboard on click', async () => {
    await harness.navigateByUrl('/dashboard');
    expect(harness.routeNativeElement?.textContent).toContain('Listado de Pokemon');
  });

  it('should have a "add pokemon" button that navigates to /add-pokemon on click', async () => {
    await harness.navigateByUrl('/add-pokemon');
    expect(harness.routeNativeElement?.textContent).toContain('Crear Nuevo Pokémon');
  });
});
