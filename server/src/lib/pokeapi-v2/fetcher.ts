import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export = {
  getPokemon: (identifier: number | string) => {
    return axios.get(`${BASE_URL}/pokemon/${identifier}`);
  },
};
