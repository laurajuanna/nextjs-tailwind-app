import { Card, CardBody, Image } from '@nextui-org/react'
import { useRouter } from 'next/router';

interface Props {
    id: number;
}

export const FavoriteCardPokemon = ({ id }: Props) => {

    const router = useRouter();

    const onPokemonClick = (id: number) => {
        router.push(`/pokemon/${id}`)
    }

    return (
        <Card shadow="sm" key={id} isPressable isHoverable onPress={() => onPokemonClick(id)}>
            <CardBody className="overflow-visible p-0">
                <Image
                    shadow="sm"
                    radius="lg"
                    width={140}
                    alt={`Pokemon image ID ${id}`}
                    className="object-contain h-48 w-96 p-3"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                />
            </CardBody>
        </Card>
    )
}
