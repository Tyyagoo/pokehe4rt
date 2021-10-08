import api from "./fetcher";
import NodeCache from "node-cache";
import PokeAPI from "./interfaces";

const pokemonCache = new NodeCache();
type MaybePokemon = PokeAPI.Pokemon | undefined;

async function fetchPokemonById(id: number): Promise<MaybePokemon> {
  let maybePokemon: MaybePokemon = pokemonCache.get(id);
  if (maybePokemon) {
    return maybePokemon;
  } else {
    let response = await api.getPokemon(id);
    if (response.status !== 200) {
      return undefined;
    }
    let pokemon = response.data as PokeAPI.Pokemon;
    pokemonCache.set(pokemon.id, pokemon);
    return pokemon;
  }
}

let interval = setInterval(() => {
  let stats = pokemonCache.getStats();
  console.log(
    `⚡️[server]: pokemon cache -> keys: ${stats.keys}, hits: ${
      stats.hits
    }, misses: ${stats.misses}, ksize: ${stats.ksize / 1000}(kB), vsize: ${
      stats.vsize / 1000
    } (kB)`
  );
}, 5000);

const POKE_API_V2 = {
  fetchPokemonById,
};

export = POKE_API_V2;
