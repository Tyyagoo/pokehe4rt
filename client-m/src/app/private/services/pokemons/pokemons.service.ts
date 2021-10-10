import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { Pokemon } from '../../models/entity';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpService) {}

  fetchPokemons() {
    return this.http.request<Pokemon[]>('pokemons', 'GET');
  }
}
