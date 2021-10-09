import { Request, Response } from "express";
import PokemonService from "../services/pokemon.service";

export function getPokemons(pokemonService: PokemonService) {
  return async function (req: Request, res: Response) {
    console.log(req.jwt);
    let pokemons = await pokemonService.getPokemons();
    res.send(pokemons);
  };
}

export function getPokemonById(pokemonService: PokemonService) {
  return async function (req: Request, res: Response) {
    let id = parseInt(req.params.id);
    let maybePokemon = await pokemonService.getPokemonById(id);
    if (maybePokemon) {
      res.send(maybePokemon);
    } else {
      res.status(404).send({ message: "This pokemon doesn't exists." });
    }
  };
}

export function getTrainerPokemons(pokemonService: PokemonService) {
  return async function (req: Request, res: Response) {
    let id = parseInt(req.params.id);
    try {
      let pokemons = await pokemonService.getTrainerPokemons(id);
      res.send(pokemons);
    } catch {
      res.status(404).send({ message: "Trainer not found." });
    }
  };
}

export function postPokemon(pokemonService: PokemonService) {
  return async function (req: Request, res: Response) {
    let data = req.body as { pokedexId: number; trainerId: number };
    try {
      let pokemon = await pokemonService.createPokemon(data);
      res.send(pokemon);
    } catch (e) {
      let error = e as Error;
      let message = error ? error.message : "Invalid pokedex ID or trainer ID";
      res.status(400).send({ message });
    }
  };
}
