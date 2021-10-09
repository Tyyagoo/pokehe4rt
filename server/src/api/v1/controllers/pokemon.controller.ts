import express, { Router } from "express";
import { autoInjectable } from "tsyringe";
import {
  getPokemonById,
  getPokemons,
  getTrainerPokemons,
  postPokemon,
} from "../routes/pokemon.router";
import { authToken } from "../middlewares";
import PokemonService from "../services/pokemon.service";

@autoInjectable()
export default class PokemonController {
  private router: Router;
  constructor(private pokemonService: PokemonService) {
    this.router = express.Router();
  }

  routes() {
    this.router.get("/", authToken(), getPokemons(this.pokemonService));
    this.router.get("/:id", authToken(), getPokemonById(this.pokemonService));
    this.router.get(
      "/trainer/:id",
      authToken(),
      getTrainerPokemons(this.pokemonService)
    );
    // this.router.delete("/:id", deletePokemon(this.pokemonService));
    this.router.post("/", authToken(), postPokemon(this.pokemonService));
    return this.router;
  }
}
