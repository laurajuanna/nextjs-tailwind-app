import Head from "next/head"
import { Navbar } from "../ui"

interface propsWithChildren {
    children: React.ReactNode,
    title?: string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout = ({ children, title }: propsWithChildren) => {

    const titleCapitalize = title ? title.substring(0, 1).toUpperCase() + title.substring(1) : 'PokemonApp';

    return (
        <>
            <Head>
                <title>{titleCapitalize}</title>
                <meta name="author" content="Laura Juiz" />
                <meta name="description" content={`Informacion sobre el pókemon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />
                <meta property="og:title" content={`Informacion sobre el pókemon ${title}`} />
                <meta property="og:description" content={`Informacion sobre el pókemon ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
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
