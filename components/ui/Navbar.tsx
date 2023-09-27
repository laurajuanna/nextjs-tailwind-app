
import { colors, semanticColors } from '@nextui-org/theme';
import { Spacer, Image, Button } from '@nextui-org/react'
import Link from 'next/link';
import { HeartIcon } from '../icons';

export const Navbar = () => {
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0px 20px',
            backgroundColor: '#2a2a2a'
        }}>
            <Image
                width={50} height={50}
                alt="Icono de la app"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            />
            <Link href={'/'} className='flex font-bold text-lg'>
                <h2>P</h2>
                <h3>okémon!</h3>
            </Link>
            <Spacer style={{ flex: 1 }} ></Spacer>
            <Link href={'/favorites'}>
                <Button size="sm" color='primary' variant='ghost' aria-label='Favoritos' endContent={<HeartIcon />}>
                    Ver Favoritos
                </Button>
            </Link>
        </div>
    )
}
