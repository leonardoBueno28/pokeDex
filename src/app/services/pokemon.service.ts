import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
   private createdPokemons: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  // método para agregar un Pokémon
  addPokemon(pokemonData: any): void {
    const newPokemon: Pokemon = {
      id: Math.floor(Math.random() * 1000) + 1000,
      name: pokemonData.name,
      weight: pokemonData.weight,
      sprites: {
        front_default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&s',
        front_shiny: '',
        front_female: '',
        front_shiny_female: '',
        back_default: '',
        back_shiny: '',
        back_female: '',
        back_shiny_female: ''
      },
      types: pokemonData.types.map((t: string) => ({ slot: 1, type: { name: t, url: '' } })),
      moves: pokemonData.moves.map((m: string) => ({ move: { name: m, url: '' } })),
      url: `local-url-${pokemonData.name}`
      ,
      image: '',
      color: ''
    };

    this.createdPokemons.push(newPokemon);
  }

  getPokemons(limit: number, offset: number): Observable<any> {
    const api$ = this.http.get<any>(
      `${this.apiUrl}?offset=${offset}&limit=${limit}`
    );

    return api$.pipe(
      switchMap((response: any) => {
        const allPokemons = [...response.results, ...this.createdPokemons];
        const detailRequests = allPokemons.map((p) =>
          p.url.startsWith('local-url')
            ? this.getPokemonByName(p.name)
            : this.http.get<any>(p.url)
        );
        return forkJoin(detailRequests).pipe(
          map((detailedPokemons) => {
            return {
              ...response,
              results: detailedPokemons,
              count: response.count + this.createdPokemons.length,
            };
          })
        );
      })
    );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    const foundPokemon = this.createdPokemons.find((p) => p.name === name);
    if (foundPokemon) {
      return new Observable((observer) => {
        observer.next(foundPokemon);
        observer.complete();
      });
    }
    return this.http.get<Pokemon>(`${this.apiUrl}/${name}`);
  }

  getPokemonsUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getTypesPokemon(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/type?offset=0&limit=999');
  }

  getMovesPokemon(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/move?offset=0&limit=999');
  }
}
