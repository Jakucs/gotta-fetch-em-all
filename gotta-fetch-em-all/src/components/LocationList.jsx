function LocationList({locations, onSelect}){
    return (
    <>
            <div className="locations-container">
                {locations.map((location) => (
                    <div className="currentLocation" key={location.name}>
                        <button 
                        className="location-btn"
                        onClick={()=>onSelect(location)}
                        >{location.name}</button>
                    </div>
                ))}
            </div>
    </>
)
}

export default LocationList