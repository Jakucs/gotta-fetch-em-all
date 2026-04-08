import { useEffect, useState } from "react"

function Pokemons(props){
    
    const [pokemonURLs, setPokemonURLs] = useState([])
    const [onePokemon, setOnePokemon] = useState(null)

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
            console.log(pokemonList)
            
            const urls = pokemonList.map(p=>p.pokemon.url ?? null)
            setPokemonURLs(urls)
        }
        getPokemon()
        //console.log(pokemonURLs)
    }, [])

    //console.log(pokemonURLs)
    let randomPokemonURL = pokemonURLs[Math.floor(Math.random() * pokemonURLs.length)]
    
    useEffect(()=> {
        async function fetchOnePokemon(){
            
            let res = await fetch(randomPokemonURL)
            let data = await res.json()
            console.log("data", data)
            setOnePokemon(data)
        }
        fetchOnePokemon()
    }, [])
    //console.log("onePokemon", onePokemon)

    return(
        <div>
            <div key={props.selectedLocation.name}>
                <h3>{props.selectedLocation.name}</h3>
            </div>
        </div>
    )
}

export default Pokemons