import "reflect-metadata";
import express from "express";
import { container } from "tsyringe";
import bodyParser from "body-parser";
import TrainerController from "./api/v1/controllers/trainer.controller";
import PokemonController from "./api/v1/controllers/pokemon.controller";

const PORT = 8000;
const app = express();
app.use(bodyParser.json());

const trainerController = container.resolve(TrainerController);
const pokemonController = container.resolve(PokemonController);

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.use("/trainers", trainerController.routes());
app.use("/pokemons", pokemonController.routes());

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
);
