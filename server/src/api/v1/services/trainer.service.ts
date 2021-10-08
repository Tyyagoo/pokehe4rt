import { Prisma } from ".prisma/client";
import { autoInjectable } from "tsyringe";
import TrainerRepository from "../repositories/trainer.repository";

@autoInjectable()
export default class TrainerService {
  constructor(private trainerRepository: TrainerRepository) {}

  async getTrainers() {
    return this.trainerRepository.findAllTrainers();
  }

  async getTrainer(id: number) {
    return this.trainerRepository.findTrainerById(id);
  }

  async createTrainer(trainer: Prisma.TrainerCreateInput) {
    return this.trainerRepository.createTrainer(trainer);
  }

  async deleteTrainer(id: number) {
    try {
      let [_, trainer] = await this.trainerRepository.deleteTrainerById(id);
      return trainer;
    } catch {
      return undefined;
    }
  }
}
