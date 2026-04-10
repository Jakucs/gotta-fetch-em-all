import { useState, useEffect } from 'react'
import './App.css'
import Locations from './components/Locations'
import Pokemons from './components/Pokemons'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)

  return (
    <>
      {!selectedLocation ? (
        <div>
          <h1>Pokémon Locations</h1>
          <Locations
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      ) : (
        <Pokemons
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
    </>
  )
}

export default App
