import { pokeApi } from "@/api"
import { Layout } from "@/components/layouts"
import { PokemonCard } from "@/components/pokemon"
import { PokemonListResponse, SmallPokemon } from "@/interfaces"
import { NextPage, GetStaticProps } from "next"

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title='Listado de Pokémons'>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 mt-6">
        {pokemons.map((item) => { // desestructuro del arreglo el contenido que necesito
          return <PokemonCard key={item.name} pokemon={item} />
        })}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((item, index) => {
    return ({
      ...item, // de esta forma retorno lo que ya traia el item dentro (name y url en este caso)
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
    })
  })

  return {
    props: {
      pokemons: pokemons
    }
  }
}

export default HomePage