import express, { Router } from "express";
import { autoInjectable } from "tsyringe";
import {
  deleteTrainer,
  getTrainer,
  getTrainers,
  postTrainer,
} from "../routes/trainer.router";
import { authToken } from "../middlewares";
import TrainerService from "../services/trainer.service";

@autoInjectable()
export default class TrainerController {
  private router: Router;
  constructor(private trainerService: TrainerService) {
    this.router = express.Router();
  }

  routes() {
    this.router.get("/", authToken(), getTrainers(this.trainerService));
    this.router.get("/:id", authToken(), getTrainer(this.trainerService));
    this.router.delete("/:id", authToken(), deleteTrainer(this.trainerService));
    this.router.post("/", authToken(), postTrainer(this.trainerService));
    return this.router;
  }
}
