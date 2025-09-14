import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { PokemonService } from '../../services/pokemon.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', ['getPokemons']);

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceSpy }
      ]
    })
    .compileComponents();

    pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons on init', () => {
    const mockPokemons = [{ name: 'Pikachu' }, { name: 'Charmander' }];
    pokemonService.getPokemons.and.returnValue(of(mockPokemons));

    component.ngOnInit();

    expect(component.pokemons).toEqual(mockPokemons);
    expect(pokemonService.getPokemons).toHaveBeenCalled();
  });

  it('should paginate pokemons', () => {
    const mockPokemons = Array.from({ length: 50 }, (_, i) => ({ name: `Pokemon ${i + 1}` }));
    component.pokemons = mockPokemons;
    component.pageSize = 10;

    component.paginate(1);

    expect(component.paginatedPokemons.length).toBe(10);
    expect(component.paginatedPokemons[0].name).toBe('Pokemon 1');
    expect(component.paginatedPokemons[9].name).toBe('Pokemon 10');
  });
});