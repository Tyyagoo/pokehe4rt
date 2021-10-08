import api from "./fetcher";
import NodeCache from "node-cache";
import PokeAPI from "./interfaces";

const pokemonCache = new NodeCache();
type MaybePokemon = PokeAPI.Pokemon | undefined;

async function fetchPokemonById(id: number): Promise<MaybePokemon> {
  let maybePokemon: MaybePokemon = pokemonCache.get(id);
  if (maybePokemon) {
    console.log("Returning a cached pokemon!");
    return maybePokemon;
  } else {
    let response = await api.getPokemon(id);
    console.log("Fetching the data!");
    if (response.status !== 200) {
      console.log("Oops");
      return undefined;
    }
    let pokemon = response.data as PokeAPI.Pokemon;
    pokemonCache.set(pokemon.id, pokemon);
    return pokemon;
  }
}

/*
(async () => {
  try {
    for (let i = 0; i < 5; i++) {
      let p = await getPokemonById(3);
      if (p) {
        console.log(p.name);
      } else {
        console.log("Some error has occurred.");
      }
    }
  } catch (e) {
    console.error(e);
  }
})();
*/

const POKE_API_V2 = {
  fetchPokemonById,
};

export = POKE_API_V2;
