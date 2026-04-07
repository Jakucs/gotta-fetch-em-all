import { useEffect, useState } from "react"
import "./Locations.css"
import Pokemons from "./Pokemons"

function Locations(){

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
        //console.log(locationList)
    }

    if(locationList){
        return(
            <div className="locations-container">
                {locationList.results.map((city)=> {
                    return (
                    <div className="location-item" key={city.name}>
                        <button 
                        className="location-btn" 
                        
                        onClick={()=>setSelectedLocation(city)}
                        >
                            {city.name}
                        </button>
                        
                        {selectedLocation === city ? 
                        (<Pokemons
                            selectedLocation={selectedLocation}
                        />) :
                        null
                    
                    }
                        
                    </div>
                    )
                })}
            </div>
        )
    }else{
        <p>Loading...</p>
    }
}

export default Locations