import { useEffect, useState } from "react"
import "./Locations.css"
import Pokemons from "./Pokemons"
import LocationList from "./LocationList"

function Locations(props){

    const [locationList, setLocationList] = useState(null)
    const [selectedLocation, setSelectedLocation] = useState(null)

    useEffect(()=>{
        async function getAllLocations(){
            let res = await fetch("https://pokeapi.co/api/v2/location")
            let data = await res.json()
            //console.log(data)
            setLocationList(data)
        }
        getAllLocations()
    }, [])

    if(!locationList) return

    if(selectedLocation){
        return <Pokemons selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
    }

return (
    <>
      <LocationList
      locations={locationList.results}
      onSelect={setSelectedLocation}
      />
    </>
)
    
}

export default Locations