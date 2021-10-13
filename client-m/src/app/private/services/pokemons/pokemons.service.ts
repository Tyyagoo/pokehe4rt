import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { Pokemon } from '../../models/entity';
import { PokemonCreatePayload } from '../../models/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpService) {}

  fetchPokemons() {
    return this.http.get<Pokemon[]>('pokemons');
  }

  fetchPokemonById(id: number) {
    return this.http.get<Pokemon>(`pokemons/${id}`);
  }

  fetchPokemonsByTrainer(id: number) {
    return this.http.get<Pokemon[]>(`pokemons/trainer/${id}`);
  }

  createRandomPokemon(data: PokemonCreatePayload) {
    return this.http.post<Pokemon>('pokemons', data);
  }
}
