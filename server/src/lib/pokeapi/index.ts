import Cache from "./cache";
import Fetcher from "./fetcher";
import { Pokemon } from "./interfaces";

const getAllPokemons = async () => {
  console.log("Getting and caching all pokemons");
  let pokemons = await Fetcher.pokemon.all();
  pokemons.forEach(p => Cache.pokemons.set(p.id, p));
  return pokemons;
};

const getPokemonsById = async (ids: number[]) => {
  let mustFetchIds = ids.filter(id => !Cache.pokemons.has(id));
  if (mustFetchIds.length !== 0) {
    let fetchedPokemons = await Fetcher.pokemon.ids(mustFetchIds);
    fetchedPokemons.forEach(p => Cache.pokemons.set(p.id, p));
  }
  return ids.map(id => Cache.pokemons.get(id) as Pokemon);
};

const getPokemonById = async (id: number): Promise<Pokemon> => {
  if (Cache.pokemons.has(id)) return Cache.pokemons.get(id)!;
  let pokemon = await Fetcher.pokemon.id(id);
  Cache.pokemons.set(pokemon.id, pokemon);
  return pokemon;
};

const PokeAPI = {
  pokemon: {
    all: getAllPokemons,
    ids: getPokemonsById,
    id: getPokemonById,
  },
};

export = PokeAPI;
