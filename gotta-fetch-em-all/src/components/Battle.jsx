function Battle({own, enemy}){

    if(!own) return <p>Loading...</p>
    if(!enemy) return <p>Loading...</p>
    {console.log("own, enemy", own, enemy)}

    

    return(
                <div key={own.name}>
                    <h3>{own.name}</h3>
                    <img
                    src={own.sprites?.other?.showdown?.front_default || own.sprites?.front_default}
                    alt={own.name}
                    />
                </div>
    )
}

export default Battle