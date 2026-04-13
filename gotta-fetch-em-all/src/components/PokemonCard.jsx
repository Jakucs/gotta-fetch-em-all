import { useState } from "react";
import Battle from './Battle'


function PokemonCard({pokemon, myPokemons, setMyPokemons, setSelectedLocation}){

    const [isBattle, setIsBattle] = useState(false)
    const [myFighterPokemon, setMyFighterPokemon] = useState(null)

    const animatedImage =
    pokemon.sprites?.other?.showdown?.front_default;
    const staticImage = pokemon.sprites?.front_default;



    //console.log("animatedImage:", animatedImage);
    return(
        <div>
            <div>
                {!myFighterPokemon &&      
                <div>
                <h3>Enemy: {pokemon.name}</h3>
                <img
                    src={animatedImage || staticImage}
                    alt={pokemon.name}
                />
                <br />
                <br />
                </div>        
                
}


                {!isBattle &&                 
                
                <div>

                <h3>User's Pokémons: </h3>
<div className="user-pokemons-list">
    {myPokemons.map((myPokemon) => {
        const animated = myPokemon.sprites?.other?.showdown?.front_default;
        const staticImage = myPokemon.sprites?.front_default;

        return (
            <div className="user-pokemon-card" key={myPokemon.name}>
                <h3>{myPokemon.name}</h3>
                <img
                    src={animated || staticImage}
                    alt={myPokemon.name}
                    onClick={() => {
                        setIsBattle(true)
                        setMyFighterPokemon(myPokemon)
                    }}
                />
            </div>
        );
    })}
</div>

                </div>
                }



                {isBattle && myFighterPokemon && (
                    <Battle 
                    own={myFighterPokemon} 
                    enemy={pokemon} 
                    setMyPokemons={setMyPokemons}
                    setSelectedLocation={setSelectedLocation}
                    />
                )}
{/*                     {console.log(myFighterPokemon)} */}
            </div>
        </div>
    )

}

export default PokemonCard