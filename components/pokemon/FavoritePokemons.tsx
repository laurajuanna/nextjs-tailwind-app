import React from 'react'
import { FavoriteCardPokemon } from '.';

interface Props {
    pokemons: number[];
}

export const FavoritePokemons = ({ pokemons }: Props) => {

    return (
        <div className="mt-4 gap-2 flex flex-wrap">
            {
                pokemons.map(id => (
                    <FavoriteCardPokemon key={id} id={id} />
                ))
            }
        </div>
    )
}
