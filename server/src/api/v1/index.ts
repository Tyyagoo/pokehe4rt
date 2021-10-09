import { container } from "tsyringe";
import Controllers from "./controllers";

const trainerController = container.resolve(Controllers.TrainerController);
const pokemonController = container.resolve(Controllers.PokemonController);
const userController = container.resolve(Controllers.UserController);

const API_V1 = {
  controllers: {
    trainerController,
    pokemonController,
    userController,
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
