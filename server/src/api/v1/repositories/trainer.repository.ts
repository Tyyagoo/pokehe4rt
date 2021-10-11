import prisma from "./index";
import { Prisma } from ".prisma/client";

export default class TrainerRepository {
  private trainers = prisma.trainer;

  async findAllTrainers() {
    return this.trainers.findMany();
  }

  async findTrainerById(id: number) {
    return this.trainers.findUnique({ where: { id } });
  }

  async createTrainer(trainer: Prisma.TrainerCreateInput) {
    return this.trainers.create({ data: trainer });
  }

  async deleteTrainerById(id: number) {
    const deletePokemons = prisma.pokemon.deleteMany({
      where: {
        trainerId: id,
      },
    });
    const deleteTrainer = this.trainers.delete({ where: { id } });

    const transaction = await prisma.$transaction([
      deletePokemons,
      deleteTrainer,
    ]);

    return transaction;
  }
}
