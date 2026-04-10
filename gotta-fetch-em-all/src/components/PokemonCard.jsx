import { useState } from "react";


function PokemonCard({pokemon, myPokemons}){

    const [myFighterPokemon, setMyFighterPokemon] = useState({})

    const animatedImage =
    pokemon.sprites?.other?.showdown?.front_default;
    const staticImage = pokemon.sprites?.front_default;



    //console.log("animatedImage:", animatedImage);
    return(
        <div>
            <div>
                <h3>Enemy: {pokemon.name}</h3>
                <img
                    src={animatedImage || staticImage}
                    alt={pokemon.name}
                />
                <br />
                <br />

            {(myFighterPokemon.name) ? (
                        <div key={myFighterPokemon.name}>
                            <h3>{myFighterPokemon.name}</h3>
                            <img
                            src={myFighterPokemon.sprites?.other?.showdown?.front_default || myFighterPokemon.sprites?.front_default}
                            alt={myFighterPokemon.name}
                    />
                        </div>
            ): (
                <div>
                    <h3>User's Pokémons: </h3>
                    {myPokemons.map((myPokemon) => {
                        const animated =
                        myPokemon.sprites?.other?.showdown?.front_default;
                        const staticImage = myPokemon.sprites?.front_default;
                            return (
                                <div key={myPokemon.name}>
                                    <h3>{myPokemon.name}</h3>
                                <img
                            src={animated || staticImage}
                            alt={myPokemon.name}
                            onClick={()=>setMyFighterPokemon(myPokemon)}
                        />
                                </div>
                            )
                        
                    })}
                </div>
            )}



                    {console.log(myFighterPokemon)}
            </div>
        </div>
    )

}

export default PokemonCard