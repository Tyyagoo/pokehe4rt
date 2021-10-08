import { container } from "tsyringe";
import Controllers from "./controllers";

const trainerController = container.resolve(Controllers.TrainerController);
const pokemonController = container.resolve(Controllers.PokemonController);

const API_V1 = {
  controllers: {
    trainerController,
    pokemonController,
  },
  helpers: {},
  interfaces: {},
  middlewares: {},
  models: {},
  repositories: {},
  routes: {},
  services: {},
};

export = API_V1;
