import { useState, useEffect } from 'react'
import './App.css'
import Locations from './components/Locations'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(0)

  return (
    <>
    
      <h1>Pokémon Locations</h1>
      <Locations selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}></Locations>
    </>
  )
}

export default App
