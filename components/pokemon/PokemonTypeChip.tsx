import { typeDataColor } from "@/api"
import { Type } from "@/interfaces"
import { Chip } from "@nextui-org/react"


interface Props {
    types: Type[]
}

export const PokemonTypeChip = ({ types }: Props) => {

    const foundType = (type: string) => {
        const found = typeDataColor.find((typeObj) => typeObj.type === type);
        return found?.color
    }

    return (
        <div className='flex justify-start items-center mt-4 gap-2'>
            {types.map((item) => {
                return (
                    <Chip
                        key={item.type.name}
                        style={{ backgroundColor: foundType(item.type.name) || 'gray' }}
                    >
                        {item.type.name}
                    </Chip>
                );
            })}
        </div>
    )
}
