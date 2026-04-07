import { useEffect, useState } from "react"

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
            locationList.results.map((city)=> {
                return <button key={city.name}>{city.name}</button>
            })
        )
    }else{
        console.log("Nincs adat")
    }
}

export default Locations