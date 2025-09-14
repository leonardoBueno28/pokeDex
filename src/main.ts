import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Cambiado de 'App' a 'AppComponent'
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';

if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),importProvidersFrom(HttpClientModule)],
  
})
  .catch((err) => console.error(err));