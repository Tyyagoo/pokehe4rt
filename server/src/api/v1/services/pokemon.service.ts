import { autoInjectable } from "tsyringe";
import PokemonModel from "../models/pokemon.model";
import PokemonRepository from "../repositories/pokemon.repository";
import TrainerRepository from "../repositories/trainer.repository";
import PokeAPI from "../../../lib/pokeapi";
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
    let pokedexIndexes = [...new Set(prismaPokemons.map(p => p.pokedexId))];
    let data = await PokeAPI.pokemon.ids(pokedexIndexes);
    let pokemonsData: { [key: number]: any } = {};
    data.forEach(p => (pokemonsData[p.id] = p));

    return prismaPokemons.map(p => {
      let pokeData = pokemonsData[p.pokedexId];
      return PokeHelpers.mergePokemonsModels(p, pokeData);
    });
  }

  async getPokemons() {
    return this.fetchMultiplePokemons(this.pokemonRepository.findAllPokemons());
  }

  async getPokemonById(id: number) {
    let prismaPokemon = await this.pokemonRepository.findPokemonById(id);
    if (prismaPokemon == null) return undefined;
    let pokeData = await PokeAPI.pokemon.id(prismaPokemon.pokedexId);
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
