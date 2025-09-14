import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon'

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Input() selected = false;
}
