import { Pokemon as PokeModel } from ".prisma/client";
import { Pokemon as PokeData } from "../../../lib/pokeapi/interfaces";

export default interface PokemonModel extends PokeModel, Omit<PokeData, "id"> {}
