function PokemonCard({pokemon}){
    const animatedImage =
    pokemon.sprites?.other?.showdown?.front_default;
    const staticImage = pokemon.sprites?.front_default;

    //console.log("animatedImage:", animatedImage);
    return(
        <div>
            <div>
                <h3>{pokemon.name}</h3>
                <img
                    src={animatedImage || staticImage}
                    alt={pokemon.name}
                />
                <h3>User's Pokémons: </h3>
            </div>
        </div>
    )
}

export default PokemonCard