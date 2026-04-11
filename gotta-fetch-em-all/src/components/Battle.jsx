import { useEffect, useState } from "react"
import "./Battle.css"

function Battle({own, enemy}){

    const [myHP, setMyHP] = useState(null)
    const [enemyHP, setEnemyHP] = useState(null)
    const [turn, setTurn] = useState("player")

    if(!own) return <p>Loading...</p>
    if(!enemy) return <p>Loading...</p>
    {console.log("own, enemy", own, enemy)}

    useEffect(()=>{
        setMyHP(own.hp)
        setEnemyHP(enemy.hp)
    }, [own, enemy])


    useEffect(() => {
        /*         ((((2/5+2)*B*60/D)/50)+2)*Z/255  */ 
                let myAttack=own.attack
                let enemyAttack = enemy.attack
        
                let myDefense = own.defense
                let enemyDefense = enemy.defense
                

                    const interval = setInterval(()=>{
                        if(turn=="player"){
                            let Z = Math.floor(Math.random() * (255 - 217)) + 217
                            round(myAttack, myDefense, Z)
                            setTurn("enemy")
                        }else{
                            let Z = Math.floor(Math.random() * (255 - 217)) + 217
                            round2(enemyAttack, enemyDefense, Z)
                            setTurn("player")
                        }
                    }, 1000)
                
                    return () => {
                        clearInterval(interval)
                    }
                
    }, [turn])
    

    function round(myAttack, myDefense, Z){
        let myDamage = ((((2/5+2)*myAttack*60/myDefense)/50)+2)*Z/255
        setMyHP(prev=>prev-myDamage)
        console.log(myHP)
    }

        function round2(enemyAttack, enemyDefense, Z){
        let enemyDamage = ((((2/5+2)*enemyAttack*60/enemyDefense)/50)+2)*Z/255
        setEnemyHP(prev=>prev-enemyDamage)
        console.log(enemyHP)
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
                    <p>HP: {myHP}</p>

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
                    <p>HP: {enemyHP}</p>

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