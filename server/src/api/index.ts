import express from "express";
import API_V1 from "./v1";

const API_ROUTING = express.Router();

API_ROUTING.use("/v1/trainers", API_V1.controllers.trainerController.routes());
API_ROUTING.use("/v1/pokemons", API_V1.controllers.pokemonController.routes());
API_ROUTING.use("/v1/user", API_V1.controllers.userController.routes());

export = API_ROUTING;
