import { useState, useEffect } from 'react'
import './App.css'
import Locations from './components/Locations'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Pokémon Locations</h1>
      <Locations></Locations>
    </>
  )
}

export default App
