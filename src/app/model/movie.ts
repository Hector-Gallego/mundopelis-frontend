import { Actor } from "./actor";
import { Director } from "./director";
import { Genre } from "./genre";

export interface Movie {
    name: string;
    description: string;
    url: string;
    id: Number;
    genres: Genre[];
    director: Director;
    actors: Actor[];
  }