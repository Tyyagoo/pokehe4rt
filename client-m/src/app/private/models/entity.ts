export type User = {
  id: string;
  username: string;
  createdAt: Date;
};

export type Trainer = {
  userId: string;
  id: number;
  name: string;
  region: string;
  age: number;
};

export type Pokemon = {
  id: number;
  pokedexId: number;
  trainerId: number;
  level: number;
  xp: bigint;
  ivHp: number;
  ivAtk: number;
  ivDef: number;
  ivSpAtk: number;
  ivSpDef: number;
  ivSpe: number;
  evHp: number;
  evAtk: number;
  evDef: number;
  evSpAtk: number;
  evSpDef: number;
  evSpe: number;

  // common data
  baseExperience: number;
  height: number;
  isDefault: boolean;
  name: string;
  order: number;
  pokemonSpeciesId: number;
  weight: number;
};
