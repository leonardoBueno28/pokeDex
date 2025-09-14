import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { Pokemon } from '../../models/pokemon';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    PokemonListComponent,
    PokemonDetailComponent,
    ReactiveFormsModule,
  ],
})
export class DashboardComponent implements OnInit {
  constructor(private pokemonService: PokemonService, private http: HttpClient) {}

  pokemons: Pokemon[] = [];

  filteredPokemons: Pokemon[] = [...this.pokemons];
  selectedPokemon: Pokemon | null = this.pokemons[0];
  searchControl = new FormControl('');
  currentPage = 1;
  limit = 12;
  totalCount = 0;
  nextPageUrl: string | null = null;
  previousPageUrl: string | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.getPokemons();
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.filterPokemons(searchTerm || '');
      });
  }

  filterPokemons(term: string) {
    const lowerTerm = term.toLowerCase();
    if (lowerTerm) {
      const pokemonFilter =
        this.pokemons.filter((p) => p.name.toLowerCase().includes(lowerTerm))[0] || null;
      this.getPokemons(pokemonFilter ? pokemonFilter.name : lowerTerm);
    }
  }

  getPokemons(name?: string) {
    this.isLoading = true;
    this.selectedPokemon = null;
    if (name) {
      this.pokemonService.getPokemonByName(name).subscribe(
        (data) => {
          this.pokemons = [data];
          this.filteredPokemons = [...this.pokemons];
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        },
        (error) => {
          this.isLoading = false;
        }
      );
    } else {
      this.pokemonService.getPokemons(this.limit, 0).subscribe(
        (data) => {
          this.totalCount = data.count;
          this.nextPageUrl = data.next;
          this.previousPageUrl = data.previous;
          const results = data.results;

          const requests = results.map((p: any) => this.http.get(p.url));
          forkJoin(requests).subscribe(
            (detailedPokemons: any) => {
              this.pokemons = detailedPokemons;
              this.filteredPokemons = [...this.pokemons];
              setTimeout(() => {
                this.isLoading = false;
              }, 1000);
            },
            (error) => {
              this.isLoading = false;
            }
          );
        },
        (error) => {
          this.isLoading = false;
        }
      );
    }
  }

  getPaginatedPokemons(url: string) {
    this.isLoading = true;
    this.pokemonService.getPokemonsUrl(url).subscribe(
      (data) => {
        this.nextPageUrl = data.next;
        this.previousPageUrl = data.previous;
        const results = data.results;

        const requests = results.map((p: any) => this.http.get(p.url));
        forkJoin(requests).subscribe(
          (detailedPokemons: any) => {
            this.pokemons = detailedPokemons;
            this.filteredPokemons = [...this.pokemons];
            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
          },
          (error) => {
            this.isLoading = false;
          }
        );
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  selectPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  previousPage() {
    this.selectedPokemon = null;
    this.getPaginatedPokemons(this.previousPageUrl!);
    this.currentPage--;
  }

  nextPage() {
    this.selectedPokemon = null;
    this.getPaginatedPokemons(this.nextPageUrl!);
    this.currentPage++;
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.limit);
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.getPokemons();
  }
}
