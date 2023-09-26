import { Image } from '@nextui-org/react'

export const NoFavorites = () => {
    return (
        <div className='flex flex-col h-[calc(100vh-100px)] items-center justify-center self-center'>
            <h1 className='font-bold mb-4'>No hay favoritos</h1>
            <Image
                src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg'
                width={250}
                height={250}
                alt='Imagen Ditto'
                style={{ opacity: 0.5 }}
            />
        </div>
    )
}
