import { Pokemon } from "@prisma/client";
import PokeAPI from "../../../lib/pokeapi-v2/interfaces";
import PokemonModel from "../models/pokemon.model";

const mergePokemonsModels = (
  prismaModel: Pokemon,
  dataModel: PokeAPI.Pokemon
): PokemonModel => {
  let pokemon: PokemonModel = {
    name: dataModel.name,
    base_experience: dataModel.base_experience,
    height: dataModel.height,
    is_default: dataModel.is_default,
    order: dataModel.order,
    weight: dataModel.weight,
    id: prismaModel.id,
    pokedexId: prismaModel.pokedexId,
    trainerId: prismaModel.trainerId,
  };

  return pokemon;
};

const PokeHelpers = {
  mergePokemonsModels,
};

export = PokeHelpers;
