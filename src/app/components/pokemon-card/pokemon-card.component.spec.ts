import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pokemon name', () => {
    component.pokemon = { name: 'Pikachu', id: 25 }; // Example Pokémon data
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.pokemon-name').textContent).toContain('Pikachu');
  });

  it('should display pokemon id', () => {
    component.pokemon = { name: 'Pikachu', id: 25 }; // Example Pokémon data
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.pokemon-id').textContent).toContain('#25');
  });
});