import { SmallPokemon } from "@/interfaces"
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react"
import { useRouter } from "next/router";

interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard = ({ pokemon }: Props) => {

    const { id, name, img } = pokemon;

    const router = useRouter();

    const onPokemonClick = (name: string) => {
        router.push(`/name/${name}`)
    }

    return (
        <Card shadow="sm" key={id} isPressable isHoverable onPress={() => onPokemonClick(name)}>
            <CardBody className="overflow-visible p-0">
                <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={name}
                    className="w-full object-cover h-[140px]"
                    src={img}
                />
            </CardBody>
            <CardFooter className="text-small justify-between">
                <b className="text-transform: capitalize">{name}</b>
                <p className="text-default-500">#{id}</p>
            </CardFooter>
        </Card>
    )
}