import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number, offset: number): Observable<any> {
    return this.http.get<{
      count: number;
      next: string | null;
      previous: string | null;
      results: { name: string; url: string }[];
    }>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonByName(name: string): Observable<any> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  } 

  getPokemonsUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
