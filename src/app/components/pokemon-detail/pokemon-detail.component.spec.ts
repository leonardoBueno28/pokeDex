import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { Pokemon } from '../../models/pokemon';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;

  const mockPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    weight: 69,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      front_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      front_female:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      front_shiny_female:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      back_female:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      back_shiny_female:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    },
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    moves: [
      { move: { name: 'move1', url: '' } },
      { move: { name: 'move2', url: '' } },
      { move: { name: 'move3', url: '' } },
      { move: { name: 'move4', url: '' } },
      { move: { name: 'move5', url: '' } },
      { move: { name: 'move6', url: '' } },
      { move: { name: 'move7', url: '' } },
      { move: { name: 'move8', url: '' } },
      { move: { name: 'move9', url: '' } },
      { move: { name: 'move10', url: '' } },
      { move: { name: 'move11', url: '' } },
      { move: { name: 'move12', url: '' } },
    ],
    url: '',
    image: '',
    color: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent], // al ser standalone, se importa directo
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract sprite URLs on pokemon input change', () => {
    component.pokemon = mockPokemon;
    component.ngOnChanges();

    expect(component.spriteUrls.length).toBeGreaterThan(0);
    expect(component.spriteUrls).toContain(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
    expect(component.spriteUrls).toContain(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
    expect(component.spriteUrls).toContain(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
    expect(component.spriteUrls).toContain(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
    expect(component.spriteUrls).toContain(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
  });

  it('visibleTypes should limit to 10 if showAllTypes is false', () => {
    component.pokemon = mockPokemon;
    component.showAllTypes = false;
    const result = component.visibleTypes;
    expect(result.length).toBeLessThanOrEqual(15);
    expect(result).toEqual(mockPokemon.types);
  });

  it('visibleTypes should show all if showAllTypes is true', () => {
    component.pokemon = mockPokemon;
    component.showAllTypes = true;
    const result = component.visibleTypes;
    expect(result).toEqual(mockPokemon.types);
  });

  it('visibleMoves should limit to 10 if showAllMoves is false', () => {
    component.pokemon = mockPokemon;
  component.showAllMoves = false;
  const result = component.visibleMoves;
  
  expect(result.length).toBe(5);
  
  expect(result).toEqual(mockPokemon.moves.slice(0, 5));
  });

  it('visibleMoves should show all if showAllMoves is true', () => {
    component.pokemon = mockPokemon;
    component.showAllMoves = true;
    const result = component.visibleMoves;
    expect(result).toEqual(mockPokemon.moves);
  });

  it('visibleSprites should limit to 10 if showAllSprites is false', () => {
    component.pokemon = mockPokemon;
    component.ngOnChanges();
    component.showAllSprites = false;
    const result = component.visibleSprites;
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('visibleSprites should show all if showAllSprites is true', () => {
    component.pokemon = mockPokemon;
    component.ngOnChanges();
    component.showAllSprites = true;
    const result = component.visibleSprites;
    expect(result).toEqual(component.spriteUrls);
  });
});
