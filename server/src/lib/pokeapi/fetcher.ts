import axios, { AxiosRequestConfig } from "axios";
import { APIPokemonsResponse } from "./interfaces";

const queryHeader: Partial<AxiosRequestConfig> = {
  baseURL: "https://beta.pokeapi.co/graphql",
  url: `/v1beta`,
  method: "post",
  headers: {
    "Contenty-Type": "application/json",
    "X-Method-Used": "graphiql",
  },
};

const queryTypes = {
  pokemon: `baseExperience: base_experience
        height
        id
        isDefault: is_default
        name
        order
        pokemonSpeciesId: pokemon_species_id
        weight`,
};

const fetchData = async (query: string) => {
  let res = await axios({
    ...queryHeader,
    data: {
      query,
    },
  });

  if (res.status !== 200) throw new Error(res.statusText);
  return res.data;
};

const fetchAllPokemons = async () => {
  console.log("[Fetcher]: Requesting all pokémons.");
  let query = `
    query MyQuery {
        pokemons: pokemon_v2_pokemon {
        ${queryTypes.pokemon}
        }
    }
  `;
  let json = (await fetchData(query)) as APIPokemonsResponse;
  return json.data.pokemons;
};

const fetchPokemonsByIds = async (ids: number[]) => {
  console.log(`[Fetcher]: Requesting ids: ${ids.join(",")}`);
  let query = `
    query MyQuery($_in: [Int!] = [${ids.join(",")}]) {
        pokemons: pokemon_v2_pokemon(where: {id: {_in: $_in}}) {
        ${queryTypes.pokemon}
        }
    }`;

  let json = (await fetchData(query)) as APIPokemonsResponse;
  return json.data.pokemons;
};

const Fetcher = {
  pokemon: {
    all: fetchAllPokemons,
    ids: fetchPokemonsByIds,
    id: async (id: number) => (await fetchPokemonsByIds([id]))[0],
  },
};

export = Fetcher;
