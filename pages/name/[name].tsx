import { useState, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, CardBody, CardHeader, Chip, Image } from '@nextui-org/react';

import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts'
import { Pokemon, PokemonListResponse } from '@/interfaces';
import { getPokemonInfo, localFavorites } from '@/utils';
import { HeartIcon } from '@/components/icons';

interface Props {
    pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

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

    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);

    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name);

    return {
        paths: pokemonNames.map(name => ({
            params: { name }
        })),
        fallback: false
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };

    return {
        props: { pokemon: await getPokemonInfo(name) }
    }
}

export default PokemonByNamePage