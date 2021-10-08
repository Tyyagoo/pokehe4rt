import { Pokemon as PokeModel } from "@prisma/client";
import { Pokemon as PokeData } from "../../../lib/pokeapi/interfaces";

import PokemonModel from "../models/pokemon.model";

const mergePokemonsModels = (
  prismaModel: PokeModel,
  dataModel: PokeData
): PokemonModel => {
  let pokemon: PokemonModel = {
    ...dataModel,
    ...prismaModel,
  };

  return pokemon;
};

const PokeHelpers = {
  mergePokemonsModels,
};

export = PokeHelpers;
