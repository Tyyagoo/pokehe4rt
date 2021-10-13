export type API_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ServerSuccessResponse<T> = {
  data: T;
};

export type TrainerCreatePayload = {
  name: string;
  region: string;
  age: number;
  // owner -> server will set that based on your token
};

export type PokemonCreatePayload = {
  trainerId: number;
  // pokedexId -> the pokemon is randomly choosen
  // maybe in the future, send a locationId
};
