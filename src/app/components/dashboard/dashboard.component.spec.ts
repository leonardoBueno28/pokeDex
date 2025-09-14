import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pokemon } from '../../models/pokemon'; // Asegúrate de que la ruta sea correcta

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;
  let httpMock: HttpTestingController;

  const mockPokemonListResponse = {
    count: 100,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=12&limit=12',
    previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=12',
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  };

  const mockDetailedPokemons: Pokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      sprites: {
        front_default: '',
        front_shiny: '',
        front_female: '',
        front_shiny_female: '',
        back_default: '',
        back_shiny: '',
        back_female: '',
        back_shiny_female: '',
      },
      types: [],
      weight: 0,
      moves: [],
      image: '',
      color: '',
    },
    {
      id: 2,
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
      sprites: {
        front_default: 'url_b',
        front_shiny: '',
        front_female: '',
        front_shiny_female: '',
        back_default: '',
        back_shiny: '',
        back_female: '',
        back_shiny_female: '',
      },
      types: [],
      weight: 0,
      moves: [],
      image: '',
      color: '',
    },
  ];

  beforeEach(async () => {
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', [
      'getPokemonsUrl',
      'getPokemons',
      'getPokemonByName',
    ]);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: PokemonService, useValue: pokemonServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle pagination for next page', fakeAsync(() => {
    component.nextPageUrl = mockPokemonListResponse.next;
    component.currentPage = 1;

    pokemonService.getPokemonsUrl.and.returnValue(of(mockPokemonListResponse));

    component.nextPage();

    expect(pokemonService.getPokemonsUrl).toHaveBeenCalledWith(component.nextPageUrl as string);

    const req1 = httpMock.expectOne(mockPokemonListResponse.results[0].url);
    const req2 = httpMock.expectOne(mockPokemonListResponse.results[1].url);
    req1.flush(mockDetailedPokemons[0]);
    req2.flush(mockDetailedPokemons[1]);

    tick(1000);
    expect(component.isLoading).toBeFalse();
    expect(component.pokemons).toEqual(mockDetailedPokemons);

    flush();
  }));

  it('should handle pagination for previous page', fakeAsync(() => {
    component.previousPageUrl = mockPokemonListResponse.previous;
    component.currentPage = 2;

    pokemonService.getPokemonsUrl.and.returnValue(of(mockPokemonListResponse));

    component.previousPage();

    expect(pokemonService.getPokemonsUrl).toHaveBeenCalledWith(component.previousPageUrl as string);

    const req1 = httpMock.expectOne(mockPokemonListResponse.results[0].url);
    const req2 = httpMock.expectOne(mockPokemonListResponse.results[1].url);
    req1.flush(mockDetailedPokemons[0]);
    req2.flush(mockDetailedPokemons[1]);

    tick(1000);
    expect(component.isLoading).toBeFalse();
    expect(component.pokemons).toEqual(mockDetailedPokemons);

    flush();
  }));

});
