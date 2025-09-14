import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit, OnChanges {
  @Input() pokemon!: Pokemon;
  spriteUrls: string[] = [];
  showAllTypes = false;
  showAllMoves = false;
  showAllSprites = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.pokemon && this.pokemon.sprites) {
      this.spriteUrls = extractSpriteUrls(this.pokemon.sprites);
    }
  }

  get visibleTypes() {
    return this.showAllTypes ? this.pokemon.types : this.pokemon.types.slice(0, 5);
  }

  get visibleMoves() {
    return this.showAllMoves ? this.pokemon.moves : this.pokemon.moves.slice(0, 5);
  }

  get visibleSprites() {
    return this.showAllSprites ? this.spriteUrls : this.spriteUrls.slice(0, 5);
  }
}

function extractSpriteUrls(obj: any): string[] {
  let urls: string[] = [];

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const value = obj[key];

    if (typeof value === 'string' && value) {
      urls.push(value);
    } else if (typeof value === 'object' && value !== null) {
      urls = urls.concat(extractSpriteUrls(value));
    }
  }

  return urls;
}
