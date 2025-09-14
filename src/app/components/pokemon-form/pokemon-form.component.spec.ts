import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { PokemonFormComponent } from './pokemon-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokemonFormComponent', () => {
  let component: PokemonFormComponent;
  let fixture: ComponentFixture<PokemonFormComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Espías para el servicio y el router
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', [
      'getTypesPokemon',
      'getMovesPokemon',
      'addPokemon'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Mock para los datos de la API
    const mockTypes = { results: [{ name: 'Fuego' }, { name: 'Agua' }] };
    const mockMoves = { results: [{ name: 'Placaje' }, { name: 'Ascuas' }] };

    pokemonServiceSpy.getTypesPokemon.and.returnValue(of(mockTypes));
    pokemonServiceSpy.getMovesPokemon.and.returnValue(of(mockMoves));

    await TestBed.configureTestingModule({
      imports: [PokemonFormComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonFormComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Mockear localStorage antes de la inicialización del componente
    spyOn(localStorage, 'getItem').and.returnValue('50');

    fixture.detectChanges(); // Ejecuta ngOnInit
  });

  it('should create the component and initialize the form', () => {
    expect(component).toBeTruthy();
    expect(component.pokemonForm).toBeDefined();
    expect(component.pokemonForm.get('name')).toBeDefined();
  });


  it('should read nextCount from localStorage on init', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('totalCount');
    expect(component.nextCount).toBe(51);
  });

  it('should enable the submit button when the form is valid', () => {
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
    
    // Llenar el formulario con datos válidos
    component.pokemonForm.patchValue({
      name: 'Pikachu',
      weight: 60,
      types: ['Eléctrico'],
      moves: ['Impactrueno']
    });

    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse();
  });
  
  it('should call addPokemon and navigate on valid form submission', () => {
    // Llenar el formulario para que sea válido
    component.pokemonForm.patchValue({
      name: 'Pikachu',
      weight: 60,
      types: ['Eléctrico'],
      moves: ['Impactrueno']
    });

    component.onSubmit();
    
    // Verificar que los métodos del servicio y el router hayan sido llamados
    expect(pokemonService.addPokemon).toHaveBeenCalledWith({
      name: 'Pikachu',
      weight: 60,
      types: ['Eléctrico'],
      moves: ['Impactrueno'],
      sprites: []
    });
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
  
  it('should not call addPokemon or navigate on invalid form submission', () => {
    // El formulario está inválido por defecto (sin datos)
    component.onSubmit();
    
    // Verificar que los métodos NO hayan sido llamados
    expect(pokemonService.addPokemon).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
  
  it('should add selected file to sprites FormArray', () => {
    const mockFile = new File([''], 'test.png', { type: 'image/png' });
    const mockEvent = { target: { files: [mockFile] } };
    
    component.onFileSelected(mockEvent);
    
    expect(component.sprites.length).toBe(1);
    expect(component.sprites.at(0).value).toBe(mockFile);
  });
});