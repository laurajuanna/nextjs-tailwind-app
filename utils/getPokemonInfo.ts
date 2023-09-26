import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

export const getPokemonInfo = async (nameOrId: string) => {

    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    return {
        id: data.id,
        name: data.name,
        sprites: {
            front_default: data.sprites.front_default,
            back_default: data.sprites.back_default,
            front_shiny: data.sprites.front_shiny,
            back_shiny: data.sprites.back_shiny,
            other: {
                dream_world: data.sprites.other?.dream_world
            }
        },
        types: data.types,
        moves: data.moves
    }

}