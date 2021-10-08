export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string;
  trainerId: number;
  trainer: Trainer;
}

export interface Trainer {
  id: number;
  name: string;
  region: string;
  age: number;
  pokemons: Pokemon[];
}
