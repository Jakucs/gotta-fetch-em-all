import "./Battle.css"

function Battle({own, enemy}){

    if(!own) return <p>Loading...</p>
    if(!enemy) return <p>Loading...</p>
    {console.log("own, enemy", own, enemy)}



    function fight(){
/*         ((((2/5+2)*B*60/D)/50)+2)*Z/255  */ 
        let myAttack=own.attack
        let enemyAttack = enemy.attack

        let myDefense = own.defense
        let enemyDefense = enemy.defense
        let Z = Math.floor(Math.random() * (255 - 217)) + 217

        setInterval(()=>{
            round(myAttack, enemyAttack, myDefense, enemyDefense, Z)
        }, 1000)

    }
fight()

    function round(myAttack, enemyAttack, myDefense, enemyDefense, Z){
        let myNewData = ((((2/5+2)*myAttack*60/myDefense)/50)+2)*Z/255
        let enemyNewData = ((((2/5+2)*enemyAttack*60/enemyDefense)/50)+2)*Z/255
        console.log(myNewData)
        console.log(enemyNewData)
    }


    return(
    <div>
        <div className="battle-container">

            <div className="battle-arena">

                {/* Enemy */}
                <div className="battle-card">
                    <h3>{enemy.name}</h3>
                    <img
                        className="battle-img"
                        src={enemy.sprites?.other?.showdown?.front_default || enemy.sprites?.front_default}
                        alt={enemy.name}
                    />
                    <p>HP: {enemy.hp}</p>

                    <div className="hp-bar">
                        <div
                            className="hp-fill"
                            style={{ width: `${enemy.hp}%` }}
                        />
                    </div>
                </div>

                <div className="vs-text">VS</div>

                {/* Player */}
                <div className="battle-card">
                    <h3>{own.name}</h3>
                    <img
                        className="battle-img"
                        src={own.sprites?.other?.showdown?.front_default || own.sprites?.front_default}
                        alt={own.name}
                    />
                    <p>HP: {own.hp}</p>

                    <div className="hp-bar">
                        <div
                            className="hp-fill"
                            style={{ width: `${own.hp}%` }}
                        />
                    </div>
                </div>

            </div>


        </div>
    </div>
    )
}

export default Battle