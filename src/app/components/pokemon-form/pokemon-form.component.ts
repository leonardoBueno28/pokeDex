import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css'],
})
export class PokemonFormComponent implements OnInit {
  pokemonForm!: FormGroup;

  // Datos de ejemplo para las opciones de selección
  types = [];
  moves = [];
  nextCount = 0;

  constructor(private fb: FormBuilder, private pokemonService: PokemonService,private router: Router) {}

  ngOnInit(): void {
    this.pokemonForm = this.fb.group({
      name: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      sprites: this.fb.array([]),
      // Ahora usamos un array vacío como valor inicial y un validador personalizado
      types: [[], [Validators.required, Validators.minLength(1)]],
      moves: [[], [Validators.required, Validators.minLength(1)]],
    });
    this.getAllTypes();
    this.getAllMoves();
    this.nextCount = parseInt(localStorage.getItem('totalCount') || '0', 10) + 1;
  }

  getAllTypes() {
    this.pokemonService.getTypesPokemon().subscribe((response) => {
      this.types = response.results.map((type: any) => type.name);
    });
  }

  getAllMoves() {
    this.pokemonService.getMovesPokemon().subscribe((response) => {
      this.moves = response.results.map((move: any) => move.name);
    });
  }

  get sprites(): FormArray {
    return this.pokemonForm.get('sprites') as FormArray;
  }

  onFileSelected(event: any): void {
    if (event.target.files) {
      for (const file of event.target.files) {
        this.sprites.push(new FormControl(file));
      }
    }
  }

  onSubmit(): void {
    if (this.pokemonForm.valid) {
      this.pokemonService.addPokemon(this.pokemonForm.value);
      this.router.navigate(['/dashboard']);
    } else {
      console.error('El formulario no es válido');
    }
  }
}
