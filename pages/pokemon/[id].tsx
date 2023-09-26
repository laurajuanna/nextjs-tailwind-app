import { useState, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, CardBody, CardHeader, Chip, Image } from '@nextui-org/react';

import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts'
import { Pokemon } from '@/interfaces';
import { localFavorites } from '@/utils';
import { HeartIcon } from '@/components/icons';

interface Props {
    pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    const { id, name, sprites } = pokemon;

    const [isInFavorites, setIsInFavorites] = useState(false);

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(id);
        setIsInFavorites(!isInFavorites);
    }

    useEffect(() => {
        setIsInFavorites(localFavorites.existInFavorites(pokemon.id))
    }, [pokemon.id])

    return (
        <Layout title={name}>
            <div className="gap-4 mt-6 flex">
                <div className="flex-none">
                    <Card key={id} style={{ height: '100%' }}>
                        <CardBody>
                            <Image
                                radius="lg"
                                width={300}
                                height={300}
                                alt={name}
                                //className="w-full object-cover h-[140px]"
                                src={sprites.other?.dream_world.front_default || './no-image.png'}
                            />
                            <h2 className='font-bold'>Types</h2>
                            <div className='flex justify-start items-center mt-4 gap-2'>
                                {pokemon.types.map((item, idx) => {
                                    return <Chip key={idx}>{item.type.name}</Chip>
                                })}
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="flex-1">
                    <Card style={{ height: '100%' }}>
                        <CardHeader className="font-bold justify-between">
                            <h1 className="text-transform: capitalize">#{id} - {name}</h1>
                            <Button
                                isIconOnly color='primary' variant={isInFavorites ? 'solid' : 'light'}
                                aria-label='Favoritos' radius='full' onClick={onToggleFavorite}>
                                <HeartIcon />
                            </Button>
                        </CardHeader>
                        <CardBody>
                            <h2 className='font-bold'>Sprites</h2>
                            <div className='flex justify-between flex-wrap'>
                                <Image
                                    alt={pokemon.name}
                                    src={pokemon.sprites.front_default}
                                    className="w-full object-cover h-[150px]"
                                />
                                <Image
                                    alt={pokemon.name}
                                    src={pokemon.sprites.back_default}
                                    className="w-full object-cover h-[150px]"

                                />
                                <Image
                                    alt={pokemon.name}
                                    src={pokemon.sprites.front_shiny}
                                    className="w-full object-cover h-[150px]"

                                />
                                <Image
                                    alt={pokemon.name}
                                    src={pokemon.sprites.back_shiny}
                                    className="w-full object-cover h-[150px]"

                                />
                            </div>

                            <h2 className='font-bold'>Moves</h2>
                            <div className='mt-4 gap-2 flex flex-wrap'>
                                {pokemon.moves.map((item) => {
                                    return <Chip key={item.move.name} className='text-transform: capitalize'>{item.move.name}</Chip>
                                })}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

    return {
        /*paths: [
            { params: { id: '1' } },
            { params: { id: '2' } },
            { params: { id: '3' } },
        ],*/
        paths: pokemons151.map(id => ({
            params: { id }
        })),
        fallback: false
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string };

    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

    const pokemon = {
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

    return {
        props: { pokemon }
    }
}

export default PokemonPage