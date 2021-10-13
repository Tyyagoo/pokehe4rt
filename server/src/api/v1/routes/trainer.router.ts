import { Request, Response } from "express";
import TrainerService from "../services/trainer.service";

export function getTrainers(trainerService: TrainerService) {
  return async function (req: Request, res: Response) {
    let data = await trainerService.getTrainers();
    res.status(200).send({ data });
  };
}

export function getTrainer(trainerService: TrainerService) {
  return async function (req: Request, res: Response) {
    let id = parseInt(req.params.id);
    let maybeTrainer = await trainerService.getTrainer(id);
    if (maybeTrainer) {
      res.status(200).send({ data: maybeTrainer });
    } else {
      res.status(404).send({ message: "This trainer doesn't exists." });
    }
  };
}

export function postTrainer(trainerService: TrainerService) {
  return async function (req: Request, res: Response) {
    try {
      let trainerPayload = {
        ...req.body,
        username: req!.jwt!.username as string,
      };
      let trainer = await trainerService.createTrainer(trainerPayload);
      res.status(200).send({ data: trainer });
    } catch {
      res.status(400).send();
    }
  };
}

export function deleteTrainer(trainerService: TrainerService) {
  return async function (req: Request, res: Response) {
    let id = parseInt(req.params.id);
    let trainer = await trainerService.deleteTrainer(id);
    if (trainer) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "This trainer doesn't exists." });
    }
  };
}
