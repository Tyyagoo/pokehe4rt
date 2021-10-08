export interface Pokemon {
  baseExperience: number;
  height: number;
  id: number;
  isDefault: boolean;
  name: string;
  order: number;
  pokemonSpeciesId: number;
  weight: number;
}

export interface APIPokemonsResponse {
  data: {
    pokemons: Pokemon[];
  };
}
