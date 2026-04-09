import { useEffect, useState } from "react"
import PokemonCard from "./PokemonCard"

function Pokemons(props){
    
    const [pokemonURLs, setPokemonURLs] = useState([])
    const [randomPokemonURL, setRandomPokemonURL] = useState(null)
    const [selectedPokemon, setSelectedPokemon] = useState({})

    let nextURL = props.selectedLocation.url
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
            if(isMounted)
            {
                let pokemon = {
                    name: data.forms[0].name,
                    image: data.sprites?.front_default,
                    sprites: data.sprites
                }
                setSelectedPokemon(pokemon)
            }
        }
        fetchCurrentPokemon()
            return () => {
        isMounted = false
    }
    }, [randomPokemonURL])

//console.log("selectedPokemon", selectedPokemon)

return (
    <div>
        <PokemonCard pokemon={selectedPokemon}/>
        <button className="location-btn" onClick={()=>props.setSelectedLocation(null)}>Run away...</button>
    </div>
)


}

export default Pokemons