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
        // Values for cases that dont have values in the API (i.e. when you type a pokemon in the url that doesnt exist)
        sprite = "#"; 
        types = ["N/A", "N/A"];
        abilities = ["N/A", "N/A"];
        height = "N/A";
        weight = "N/A";
        stats = ["N/A","N/A","N/A","N/A","N/A","N/A"];
    }

    return (
        <div className="detail-container">
            <div className="detail-header">
                <h2 className="detail-header-title">{router.query.name}</h2>
            </div>
            {/* ==> get all information using an component? => "Cant resolve?" */}
            <div className="detail-sprite-section">
                <img src={`${sprite}`} className="detail-pokemon-sprite" alt={`${router.query.name}_sprite`}/>
            </div>
            <div className="detail-info-section">
                <p className="detail-pokemon-typing"><strong>Typing:</strong> {types[0]} {types[1]}</p>
                <p className="detail-pokemon-abilities"><strong>Ability:</strong> {abilities[0]} - <strong>Hidden ability:</strong> {abilities[1]}</p>
                <p className="detail-pokemon-measures"><strong>Height:</strong> {height} - <strong>Weight:</strong> {weight}</p>
                <div className="detail-pokemon-stats">
                    <strong>Base stats:</strong>
                    <table className="detail-pokemon-stats-table">
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
            {/* CSS - Lelijk, mid-page... Maar global.css, e.d. werken niet, dit is de enigste manier die ik werkend krijg... */}
            {/* Body kan ik niet aanpassen? --> 100% min-height voor volledige hoogte van page gebruiken... (body heeft geen position) */}
        <style jsx>
        {`
            .detail-container {
                font-family: Calibri,Helvetica,sans-serif; 
                display: flex;
                flex-direction: column;
                background-color: rgba(167, 219, 141);
                margin: -8px;
                padding: 8px;
            }

            .detail-container .detail-header,
            .detail-container .detail-sprite-section,
            .detail-container .detail-info-section {
                text-align: center;
                color: rgba(53, 82, 38);
            }

            .detail-container .detail-header {
                outline-style: outset;
                outline-color: rgba(78, 130, 52);
                background-color: rgba(120, 200, 80);
            }

            .detail-header .detail-header-title {
                text-transform: Capitalize;
            }

            .detail-container .detail-sprite-section {

            }

            .detail-sprite-section .detail-pokemon-sprite {

            }

            .detail-container .detail-info-section {
                outline-style: inset;
                outline-color: rgba(78, 130, 52);
                background-color: rgba(120, 200, 80);
            }

            .detail-info-section .detail-pokemon-typing,
            .detail-info-section .detail-pokemon-abilities,
            .detail-info-section .detail-pokemon-measures {
                display: block;
            }

            .detail-pokemon-stats-table {
                margin: 0 auto;
                width: 50%;
                margin-bottom: 10px;
            }

            .detail-pokemon-stats-table td,
            .detail-pokemon-stats-table th {
                border: 1px solid rgba(53, 82, 38);
            }

            .detail-pokemon-stats-table th {
                width: 33.3%
            }

            .detail-pokemon-stats-table td {
                width: 16.67%
            }

            @media (max-width: 600px) {
                .detail-pokemon-stats-table {
                    width: 80%;
                }
            }
        `}
        </style>
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