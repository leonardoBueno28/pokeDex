import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { Pokemon } from '../../models/pokemon';
import { By } from '@angular/platform-browser';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  const mockPokemons: Pokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      types: [],
      weight: 69,
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        front_shiny: '',
        front_female: '',
        front_shiny_female: '',
        back_default: '',
        back_shiny: '',
        back_female: '',
        back_shiny_female: '',
      },
      moves: [],
      image: '',
      color: '',
      url: '',
    },
    {
      id: 2,
      name: 'ivysaur',
      types: [],
      weight: 130,
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        front_shiny: '',
        front_female: '',
        front_shiny_female: '',
        back_default: '',
        back_shiny: '',
        back_female: '',
        back_shiny_female: '',
      },
      moves: [],
      image: '',
      color: '',
      url: '',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent], // standalone component
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the list of pokemons', () => {
    component.pokemons = mockPokemons;
    fixture.detectChanges();

    // Busca todas las instancias de pokemon-card
    const pokemonCardElements = fixture.debugElement.queryAll(By.css('pokemon-card'));
    expect(pokemonCardElements.length).toBe(mockPokemons.length);
  });

  it('should emit select event when a pokemon is selected', () => {
    spyOn(component.select, 'emit');

    const testPokemon = mockPokemons[0];
    component.select.emit(testPokemon);
    expect(component.select.emit).toHaveBeenCalledWith(testPokemon);
  });
});
