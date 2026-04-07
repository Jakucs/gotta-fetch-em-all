import { useEffect, useState } from "react"

function Pokemons(props){
    
    const [pokemonURLs, setPokemonURLs] = useState([])

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
            
            const urls = pokemonList.map(p=>p.url)
            setPokemonURLs(urls)
        }
        getPokemon()
        console.log(pokemonURLs)
    }, [])
    
    return(
        <div key={props.selectedLocation.name}>
            <h3>{props.selectedLocation.name}</h3>
        </div>
    )
}

export default Pokemons