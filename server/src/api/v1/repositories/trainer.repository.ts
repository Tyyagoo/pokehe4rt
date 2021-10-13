import prisma from "./index";
import { Prisma } from ".prisma/client";
import { receiveMessageOnPort } from "worker_threads";

export default class TrainerRepository {
  private trainers = prisma.trainer;

  async findAllTrainers() {
    return this.trainers.findMany();
  }

  async findTrainerById(id: number) {
    return this.trainers.findUnique({ where: { id } });
  }

  async createTrainer(trainer: {
    name: string;
    region: string;
    age: number;
    username: string;
  }) {
    let username = trainer.username;
    console.log(trainer);
    return this.trainers.create({
      data: {
        name: trainer.name,
        region: trainer.region,
        age: trainer.age,
        owner: {
          connect: { username },
        },
      },
    });
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
