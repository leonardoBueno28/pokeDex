import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import {  Pokemon } from '../models/pokemon';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  const mockApiPokemons: any = {
    count: 2,
    next: '',
    previous: '',
    results: [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    ],
  };

  const mockDetailPikachu: Pokemon = {
      id: 25,
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
      sprites: {
          front_default: 'pika-sprite-url',
          front_shiny: '',
          front_female: '',
          front_shiny_female: '',
          back_default: '',
          back_shiny: '',
          back_female: '',
          back_shiny_female: ''
      },
      types: [],
      weight: 0,
      moves: [],
      image: '',
      color: ''
  };

  const mockDetailCharmander: Pokemon = {
      id: 4,
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
      sprites: {
          front_default: 'char-sprite-url',
          front_shiny: '',
          front_female: '',
          front_shiny_female: '',
          back_default: '',
          back_shiny: '',
          back_female: '',
          back_shiny_female: ''
      },
      types: [],
      weight: 0,
      moves: [],
      image: '',
      color: ''
  };
  
  const mockNewPokemon = {
    name: 'mewtwo',
    weight: 122,
    types: ['Psíquico'],
    moves: ['Telequinesis']
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
    // Limpiamos la lista de Pokémon creados antes de cada test
    (service as any).createdPokemons = [];
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a new Pokemon to the createdPokemons list', () => {
    // Verificamos que inicialmente no hay Pokémon creados
    expect((service as any).createdPokemons.length).toBe(0);

    // Llamamos al método para agregar un nuevo Pokémon
    service.addPokemon(mockNewPokemon);

    // Verificamos que la lista ahora contiene un Pokémon
    expect((service as any).createdPokemons.length).toBe(1);
    expect((service as any).createdPokemons[0].name).toBe('mewtwo');
  });

  it('should return a combined list of API and created Pokemons', (done) => {
    // Agregamos un Pokémon local antes de la llamada a la API
    service.addPokemon(mockNewPokemon);

    service.getPokemons(2, 0).subscribe(response => {
      // Verificamos que la respuesta contenga 3 Pokémon (2 de la API + 1 local)
      expect(response.results.length).toBe(3);
      expect(response.count).toBe(mockApiPokemons.count + 1); // El conteo debe ser 3
      expect(response.results.some((p: { name: string; }) => p.name === 'mewtwo')).toBeTrue();
      done();
    });

    // Simula la respuesta HTTP de la API
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=2');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiPokemons);
    
    // Simula las respuestas de los detalles de los Pokémon, incluyendo el nuevo
    const reqs = httpMock.match((request) => request.url.startsWith('https://pokeapi.co/api/v2/pokemon/') || request.url.startsWith('local-url'));
    expect(reqs.length).toBe(2); // 2 de la API y 1 local

    // Como el servicio maneja la petición localmente, no habrá una petición HTTP para 'mewtwo'.
    // Los flushes deben corresponder a las llamadas reales.
    reqs[0].flush(mockDetailPikachu);
    reqs[1].flush(mockDetailCharmander);
    // El tercer "flush" no ocurrirá, ya que el servicio lo resuelve internamente.
  });
});