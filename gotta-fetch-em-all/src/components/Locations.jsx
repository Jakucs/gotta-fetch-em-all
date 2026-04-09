import { useEffect, useState } from "react"
import "./Locations.css"
import Pokemons from "./Pokemons"

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

    if(locationList){
        console.log(locationList)
    }

    if(!locationList) return
return (
    <>
    {(selectedLocation) ? (
        <Pokemons selectedLocation={selectedLocation}/>
    ) : (
    <div className="locations-container">
        {locationList.results.map((location) => {
            return <div className="currentLocation" key={location.name}>
                <button 
                className="location-btn"
                onClick={()=>setSelectedLocation(location)}
                >{location.name}</button>
            </div>


        })}

    </div>
    )}
    </>
)


/*         return (
  <>
    {selectedLocation ? (
      <Pokemons selectedLocation={selectedLocation} />
    ) : (
      <div className="locations-container">
        {locationList?.results.map((city) => (
          <div className="location-item" key={city.name}>
            <button
              className="location-btn"
              onClick={() => setSelectedLocation(city)}
            >
              {city.name}
            </button>
          </div>
        ))}
      </div>
    )}
  </>
) */
    
}

export default Locations