import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-nav',
  standalone: true,
  templateUrl: './pokemon-nav.component.html',
  styleUrls: ['./pokemon-nav.component.css'],
  imports: [CommonModule, RouterModule],
})
export class PokemonNavComponent {}
