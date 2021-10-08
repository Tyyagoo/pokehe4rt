import { autoInjectable } from "tsyringe";
import POKE_API_V2 from "../../../lib/pokeapi-v2";
import PokemonModel from "../models/pokemon.model";
import PokemonRepository from "../repositories/pokemon.repository";
import TrainerRepository from "../repositories/trainer.repository";
import { PokeHelpers } from "../helpers";
import { Pokemon } from ".prisma/client";

@autoInjectable()
export default class PokemonService {
  constructor(
    private pokemonRepository: PokemonRepository,
    private trainerRepository: TrainerRepository
  ) {}

  private async fetchMultiplePokemons(prismaPromise: Promise<Pokemon[]>) {
    let prismaPokemons = await prismaPromise;
    let dataPokemons = await Promise.all(
      prismaPokemons.map(p => POKE_API_V2.fetchPokemonById(p.pokedexId))
    );
    let pokemons = dataPokemons.map((p, i) => {
      if (p == undefined) return undefined;
      return PokeHelpers.mergePokemonsModels(prismaPokemons[i], p);
    });
    return pokemons.filter(p => p !== undefined) as PokemonModel[];
  }

  async getPokemons() {
    return this.fetchMultiplePokemons(this.pokemonRepository.findAllPokemons());
  }

  async getPokemonById(id: number) {
    let prismaPokemon = await this.pokemonRepository.findPokemonById(id);
    if (prismaPokemon == null) return undefined;
    let pokeData = await POKE_API_V2.fetchPokemonById(prismaPokemon.pokedexId);
    if (pokeData == undefined) return undefined;
    return PokeHelpers.mergePokemonsModels(prismaPokemon, pokeData);
  }

  async getTrainerPokemons(trainerId: number) {
    let trainer = await this.trainerRepository.findTrainerById(trainerId);
    if (trainer == null) {
      throw new Error("Trainer doesn't exists.");
    }
    return this.fetchMultiplePokemons(
      this.pokemonRepository.findAllPokemonsByTrainerId(trainer.id)
    );
  }

  async createPokemon(pokemon: { pokedexId: number; trainerId: number }) {
    if (!pokemon.pokedexId || pokemon.pokedexId < 1 || pokemon.pokedexId > 151)
      throw new Error("Invalid pokedex ID.");

    if (
      !pokemon.trainerId ||
      !(await this.trainerRepository.findTrainerById(pokemon.trainerId))
    )
      throw new Error("Invalid trainer id");

    return this.pokemonRepository.createPokemon({
      pokedexId: pokemon.pokedexId,
      trainer: {
        connect: { id: pokemon.trainerId },
      },
    });
  }
}
