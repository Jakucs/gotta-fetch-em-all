import { useState, useEffect } from 'react'
import './App.css'
import Locations from './components/Locations'
import Pokemons from './components/Pokemons'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [battleResult, setBattleResult] = useState(null)

      const [myPokemons, setMyPokemons] = useState([        
        "https://pokeapi.co/api/v2/pokemon/bulbasaur",
        "https://pokeapi.co/api/v2/pokemon/charizard",
        "https://pokeapi.co/api/v2/pokemon/poliwhirl"])
  

    if (!selectedLocation) {
        return <Locations setSelectedLocation={setSelectedLocation} />
    }

    if (battleResult) {
        return (
            <div>
                {battleResult === "win" ? "You win!" : "You lose!"}
            </div>
        )
    }

    return (
        <Pokemons
            selectedLocation={selectedLocation}
            setBattleResult={setBattleResult}
            setSelectedLocation={setSelectedLocation}
            myPokemons={myPokemons}
            setMyPokemons={setMyPokemons}
        />
    )
}

export default App
