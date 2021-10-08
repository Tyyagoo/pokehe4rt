import prisma from "./index";
import { Pokemon, Prisma, Trainer } from ".prisma/client";
import POKE_API_V2 from "../../../lib/pokeapi-v2";

export default class PokemonRepository {
  pokemons = prisma.pokemon;

  async findAllPokemons() {
    return this.pokemons.findMany();
  }

  async findPokemonById(id: number) {
    return this.pokemons.findUnique({ where: { id } });
  }

  async findAllPokemonsByTrainerId(trainerId: number) {
    return this.pokemons.findMany({ where: { trainerId } });
  }

  async createPokemon(pokemon: Prisma.PokemonCreateInput) {
    return this.pokemons.create({ data: pokemon });
  }
}
