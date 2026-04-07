import { useEffect, useState } from "react"
import "./Locations.css"

function Locations(){

    const [locationList, setLocationList] = useState(null)

    useEffect(()=>{
        async function getAllLocations(){
            let res = await fetch("https://pokeapi.co/api/v2/location")
            let data = await res.json()
            //console.log(data)
            setLocationList(data)
        }
        getAllLocations()
    }, [])

    console.log(locationList)

    if(locationList){
        return(
            <div className="locations-container">
                {locationList.results.map((city)=> {
                    return <button className="location-btn" key={city.name}>{city.name}</button>
                })}
            </div>
        )
    }else{
        <p>Loading...</p>
    }
}

export default Locations