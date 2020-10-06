// Homepage -- url: http://localhost:3000/pokemon
import Link from 'next/link';

export default function Pokemon({ pokemonList }) {
    return (
        <div className="home-container">
            <div className="home-header">
                <h2>Pokémon API - Flinndal Assessment</h2>
                <h3>By: Martijn Beljaards</h3>
            </div>
            <div className="home-section">
                {pokemonList.slice(0, 10).map((e, index) => (
                <div key={index}>
                    <Link as={`/pokemon/${e.name}`} href="/pokemon/[name]">
                        <a className="home-pokemon-anchor-link">{e.name}</a>
                    </Link>
                </div>
                ))}
            </div>

            <style jsx>
            {`
                body {
                    color: red;
                }
                    
                .home-container {
                    font-family: Calibri,Helvetica,sans-serif; 
                    display: flex;
                    flex-direction: column;
                    background-color: rgba(167, 219, 141);
                    margin: -8px;
                    padding: 8px;
                    color: rgba(53, 82, 38);
                    min-height: 100%;
                }

                .home-container .home-header {
                    text-align: center;
                    outline-style: outset;
                    outline-color: rgba(78, 130, 52);
                    background-color: rgba(120, 200, 80);
                    margin-bottom: 20px;
                }

                .home-header h2 {
                    margin-bottom: 0;
                }

                .home-header h3 {
                    margin-top: 0;
                }

                .home-container .home-section {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .home-container .home-section > div {
                    flex-basis: 25%;
                    padding: 10px;
                    margin: 10px;
                    text-align: center;
                    outline-style: outset;
                    outline-color: rgba(78, 130, 52);
                    background-color: rgba(120, 200, 80);
                }

                .home-container .home-section .home-pokemon-anchor-link {
                    display: block;
                    color: rgba(53, 82, 38);
                    font-weight: bold;
                    text-decoration: none;
                    text-transform: Capitalize;
                }
            `}
            </style>
        </div>
    )
}

// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export async function getServerSideProps() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const pokemonList = await response.json();
    return { props: { pokemonList: pokemonList.results } }
}