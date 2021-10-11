import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { Pokemon } from '../../models/entity';

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

  savePokemon(data: Omit<Pokemon, 'id'>) {
    return this.http.post<Pokemon>('pokemons', data);
  }
}
