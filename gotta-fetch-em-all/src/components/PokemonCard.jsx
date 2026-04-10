function PokemonCard({pokemon, myPokemons}){
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
                    />
                            </div>
                        )
                    
                })}
            </div>
        </div>
    )
}

export default PokemonCard