// Detailpage -- url: http://localhost:3000/pokemon/[pokemonName]
import { useRouter } from 'next/router';

export default function Details({pokemonList}) {
    const router = useRouter();
    let sprite, 
          types,
          abilities,
          height,
          weight,
          stats;

    if(pokemonList !== null) {
        // Sprite
        sprite = pokemonList.sprites.front_default;
        // Types
        types = [];
        pokemonList.types.forEach(element => {
            (element.type.name !== null) ? types.push(element.type.name) : types.push("");
        });
        // Abilities
        abilities = [];
        pokemonList.abilities.forEach(element => {
            (element.ability.name !== null) ? abilities.push(element.ability.name) : abilities.push("N/A");
        });
        // Height & Weight
        height = (pokemonList.height !== null) ? (pokemonList.height / 10 + "m") : "N/A";
        weight = (pokemonList.weight !== null) ? (pokemonList.weight / 10 + "kg") : "N/A";
        // Base stats
        stats = [];
        pokemonList.stats.forEach(element => {
            (element.base_stat !== null) ? stats.push(element.base_stat) : stats.push("--");
        });
    } else {
        sprite = "#"; 
        types = ["N/A", "N/A"];
        abilities = ["N/A", "N/A"];
        height = "N/A";
        weight = "N/A";
        stats = ["N/A","N/A","N/A","N/A","N/A","N/A"];
    }

    return (
        <div>
        {console.log("POKEMONLIST", pokemonList)}
            <h2>{router.query.name}</h2>
            {
                /*
                    ==> get all information using an component? => "Cant resolve?"
                */
                <div>
                    <img src={`${sprite}`} alt={`${router.query.name}_sprite`} />
                    <p><strong>Typing:</strong> {types[0]} {types[1]}</p>
                    <p><strong>Ability:</strong> {abilities[0]} - <strong>Hidden ability:</strong> {abilities[1]}</p>
                    <p><strong>Height:</strong> {height} - <strong>Weight:</strong> {weight}</p>
                    <div>
                        <strong>Base stats:</strong>
                        <table>
                            <tbody>
                                <tr>
                                    <th>HP</th>
                                    <td>{stats[0]}</td>
                                    <th>Speed</th>
                                    <td>{stats[5]}</td>
                                </tr>
                                <tr>
                                    <th>Attack</th>
                                    <td>{stats[1]}</td>
                                    <th>Sp. Attack</th>
                                    <td>{stats[3]}</td> 
                            </tr>
                                <tr>
                                    <th>Defence</th>
                                    <td>{stats[2]}</td>
                                    <th>Sp. Defence</th>
                                    <td>{stats[4]}</td>                        
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
}

export async function getServerSideProps(context) {
    try{ 
        const {query} = context;
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + query.name);
        const pokemonList = await response.json();
        return { props: { pokemonList: pokemonList } } 
    }
    catch(error) { 
        return { props: { pokemonList: null } }
    }
}