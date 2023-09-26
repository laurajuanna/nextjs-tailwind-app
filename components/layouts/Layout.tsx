import Head from "next/head"
import { Navbar } from "../ui"

interface propsWithChildren {
    children: React.ReactNode,
    title?: string
}

export const Layout = ({ children, title }: propsWithChildren) => {

    return (
        <>
            <Head>
                <title>{title || 'PokemonApp'}</title>
                <meta name="author" content="Laura Juiz" />
                <meta name="description" content={`Informacion sobre el pókemon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />
            </Head>

            <Navbar></Navbar>
            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    )
}
