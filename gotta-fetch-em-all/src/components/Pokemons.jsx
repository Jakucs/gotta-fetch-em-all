import { useEffect, useState } from "react"
import PokemonCard from "./PokemonCard"
import "./Pokemon.css";
import Battle from "./Battle";

/*     const myPokemons = [
        "https://pokeapi.co/api/v2/pokemon/bulbasaur",
        "https://pokeapi.co/api/v2/pokemon/charizard",
        "https://pokeapi.co/api/v2/pokemon/poliwhirl"
    ] */

function Pokemons({
    selectedLocation, 
    setBattleResult, 
    setSelectedLocation, 
    myPokemons, 
    setMyPokemons}){
    
    const [pokemonURLs, setPokemonURLs] = useState([])
    const [randomPokemonURL, setRandomPokemonURL] = useState(null)
    const [selectedPokemon, setSelectedPokemon] = useState({})
    const [userPokemons, setUserPokemons] = useState([])




    let nextURL = selectedLocation.url
    useEffect(()=>{
        async function getPokemon(){
            let res = await fetch(nextURL)
            let data = await res.json()
            let nextURL2 = data.areas[0].url
            let res2 = await fetch(nextURL2)
            let data2 = await res2.json()
            //console.log(data2)
            let pokemonList = data2.pokemon_encounters
           // console.log(pokemonList)
            
            const urls = pokemonList.map(p=>p.pokemon.url ?? null)
            setPokemonURLs(urls)
        }
        getPokemon()
        //console.log(pokemonURLs)
    }, [])

    useEffect(()=>{
        if(pokemonURLs.length>0){
            const randomPokemonURL = pokemonURLs[Math.floor(Math.random()*pokemonURLs.length)]
            setRandomPokemonURL(randomPokemonURL)
        }
    }, [pokemonURLs])

    useEffect(()=>{
        if(!randomPokemonURL) return;
        let isMounted = true;
        async function fetchCurrentPokemon(){
            let res = await fetch(randomPokemonURL)
            let data = await res.json()
/*             console.log("data", data) */
            if(isMounted)
            {
                let pokemon = {
                    id: data.id,
                    name: data.forms[0].name,
                    image: data.sprites?.front_default,
                    sprites: data.sprites,
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat
                }
                setSelectedPokemon(pokemon)
            }
/*             console.log(pokemon) */
        }
        fetchCurrentPokemon()
            
    }, [randomPokemonURL])

        useEffect(()=>{
        if(!myPokemons) return;
        async function fetchMyPokemons(){
            const data = await Promise.all(myPokemons.map(async (url)=>{
                const res = await fetch(url)
                return await res.json()
            }))

            const formattedPokemons = data.map((pokemon) => ({
                    id: pokemon.id,
                    name: pokemon.forms[0].name,
                    image: pokemon.sprites?.front_default,
                    sprites: pokemon.sprites,
                    hp: pokemon.stats[0]?.base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat
            }))

            setUserPokemons(formattedPokemons)
            console.log("MYPOKEMONS", myPokemons)
            console.log("userPokemons", userPokemons)



            //console.log("data", data)
        }
        fetchMyPokemons()
        
    }, [myPokemons]) //utólagos myPokemons

    //console.log(userPokemons)

//console.log("selectedPokemon", selectedPokemon)

return (
    <div>
        <PokemonCard 
        pokemon={selectedPokemon} 
        myPokemons={userPokemons} 
        setMyPokemons={setMyPokemons}
        setSelectedLocation={setSelectedLocation}
        />
        {/* <Battle setMyPokemons={setMyPokemons}></Battle> */}
        <div className="button-row">
        <button className="location-btn" onClick={()=>setSelectedLocation(null)}>Run away...</button>
        <button className="location-btn">Fight!</button>
        </div>
    </div>
)


}

export default Pokemons