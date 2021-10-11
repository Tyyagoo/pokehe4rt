import prisma from "./index";
import { Prisma } from ".prisma/client";

export default class PokemonRepository {
  private pokemons = prisma.pokemon;

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
