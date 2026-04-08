import { useEffect, useState } from "react"

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
                    image: data.sprites?.front_default
                }
                setSelectedPokemon(pokemon)
            }
        }
        fetchCurrentPokemon()
            return () => {
        isMounted = false
    }
    }, [randomPokemonURL])

console.log("selectedPokemon", selectedPokemon)
/*     //console.log("pokemons", pokemons)
    let randomPokemonURL = pokemonURLs[Math.floor(Math.random() * pokemonURLs.length)]
    //console.log(randomPokemonURL)
    //console.log("pokemons", pokemons)

    useEffect(()=> {
        async function fetchPokemons(){
            if(randomPokemonURL){
                let res = await fetch(randomPokemonURL)
                let data = await res.json()
                //console.log("data", data)
                setPokemons(data)
            } else{
                console.log("Még nem fetchelte le")
            }
        }
        fetchPokemons()
    }, [randomPokemonURL]) */
    
    //console.log(pokemons)
    

    return(
        <div>
            <div key={props.selectedLocation.name}>
                <h3>{selectedPokemon.name}</h3>
                <img src={selectedPokemon.image} alt="no image" />
            </div>
        </div>
    )
}

export default Pokemons