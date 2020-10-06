// Homepage -- url: http://localhost:3000/pokemon
import Link from 'next/link';

export default function Pokemon({ pokemonList }) {
    return (
        <div>
            {pokemonList.slice(0, 10).map((e, index) => (
                <div key={index}>
                    <Link as={`/pokemon/${e.name}`} href="/pokemon/[name]">
                        <a>{e.name}</a>
                    </Link>
                </div>
            ))}
        </div>
    )
}

// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export async function getServerSideProps() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const pokemonList = await response.json();
    return { props: { pokemonList: pokemonList.results } }
}