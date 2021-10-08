import { Pokemon } from ".prisma/client";

export default interface PokemonModel extends Pokemon {
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  // abilities: PokemonAbility[];
  // forms: NamedAPIResource<PokemonForm>[];
  // game_indices: VersionGameIndex[];
  // held_items: PokemonHeldItem[];
  // location_area_encounters: string;
  // moves: PokemonMove[];
  // sprites: PokemonSprites;
  // species: NamedAPIResource<PokemonSpecies>;
  // stats: PokemonStat[];
  // types: PokemonType[];
}
