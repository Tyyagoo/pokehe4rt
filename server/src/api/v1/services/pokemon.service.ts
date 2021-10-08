import { Prisma, Trainer, Pokemon } from ".prisma/client";
import { autoInjectable } from "tsyringe";
import POKE_API_V2 from "../../../lib/pokeapi-v2";
import PokeAPI from "../../../lib/pokeapi-v2/interfaces";
import PokemonModel from "../models/pokemon.model";
import PokemonRepository from "../repositories/pokemon.repository";
import TrainerRepository from "../repositories/trainer.repository";

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

@autoInjectable()
export default class PokemonService {
  constructor(
    private pokemonRepository: PokemonRepository,
    private trainerRepository: TrainerRepository
  ) {}

  async getPokemons() {
    let prismaPokemons = await this.pokemonRepository.findAllPokemons();
    let dataPromises = prismaPokemons.map(p =>
      POKE_API_V2.fetchPokemonById(p.pokedexId)
    );
    let dataPokemons = await Promise.all(dataPromises);
    let pokemons = dataPokemons.map((p, i) => {
      if (p == undefined) return undefined;
      return mergePokemonsModels(prismaPokemons[i], p);
    });
    return pokemons.filter(p => p !== undefined) as PokemonModel[];
  }

  async getPokemonById(id: number) {
    let prismaPokemon = await this.pokemonRepository.findPokemonById(id);
    if (prismaPokemon == null) return undefined;
    let pokeData = await POKE_API_V2.fetchPokemonById(prismaPokemon.pokedexId);
    if (pokeData == undefined) return undefined;
    return mergePokemonsModels(prismaPokemon, pokeData);
  }

  async getTrainerPokemons(trainerId: number) {
    if ((await this.trainerRepository.findTrainerById(trainerId)) == null) {
      throw new Error("Trainer doesn't exists.");
    }
    let prismaPokemons =
      await this.pokemonRepository.findAllPokemonsByTrainerId(trainerId);
    let dataPromises = prismaPokemons.map(p =>
      POKE_API_V2.fetchPokemonById(p.pokedexId)
    );
    let dataPokemons = await Promise.all(dataPromises);
    let pokemons = dataPokemons.map((p, i) => {
      if (p == undefined) return undefined;
      return mergePokemonsModels(prismaPokemons[i], p);
    });
    return pokemons.filter(p => p !== undefined) as PokemonModel[];
  }

  async createPokemon(pokemon: { pokedexId: number; trainerId: number }) {
    if (pokemon.pokedexId < 1 || pokemon.pokedexId > 151)
      throw new Error("Invalid pokedex ID.");
    let trainer = await this.trainerRepository.findTrainerById(
      pokemon.trainerId
    );
    if (trainer == null) throw new Error("Invalid trainer id");
    return this.pokemonRepository.createPokemon({
      pokedexId: pokemon.pokedexId,
      trainer: {
        connect: { id: trainer.id },
      },
    });
  }
}
