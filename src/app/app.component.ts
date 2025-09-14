import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonNavComponent } from './components/pokemon-nav/pokemon-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,PokemonNavComponent],
  templateUrl: './app.component.html', 
})

export class AppComponent {
}