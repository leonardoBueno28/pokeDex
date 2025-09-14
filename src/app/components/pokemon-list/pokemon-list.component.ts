import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [CommonModule,PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})

export class PokemonListComponent implements OnInit {
  @Input() pokemons: Pokemon[] = [];
  @Input() selectedPokemon: Pokemon | null = null;
  @Output() select = new EventEmitter<Pokemon>();

  constructor() { }

  ngOnInit() {
  }

}
