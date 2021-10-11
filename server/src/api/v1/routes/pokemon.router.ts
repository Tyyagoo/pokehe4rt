import { Request, Response } from "express";
import PokemonService from "../services/pokemon.service";

export function getPokemons(pokemonService: PokemonService) {
  return async function (req: Request, res: Response) {
    let data = await pokemonService.getPokemons();
    res.status(200).send({ data });
  };
}

export function getPokemonById(pokemonService: PokemonService) {
  return async function (req: Request, res: Response) {
    let id = parseInt(req.params.id);
    let maybePokemon = await pokemonService.getPokemonById(id);
    if (maybePokemon) {
      res.status(200).send({ data: maybePokemon });
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
      res.status(200).send({ data: pokemons });
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
      res.status(200).send({ data: pokemon });
    } catch (e) {
      let error = e as Error;
      let message = error ? error.message : "Invalid pokedex ID or trainer ID";
      res.status(400).send({ message });
    }
  };
}
