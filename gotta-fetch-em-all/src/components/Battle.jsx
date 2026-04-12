import { useEffect, useState } from "react"
import "./Battle.css"

function Battle({own, enemy, setMyPokemons, setSelectedLocation}){

    const [myHP, setMyHP] = useState(null)
    const [enemyHP, setEnemyHP] = useState(null)
    const [turn, setTurn] = useState("player")

    const [myMaxHP, setMyMaxHP] = useState(null)
    const [enemyMaxHP, setEnemyMaxHP] = useState(null)

/*     const [gameResult, setGameResult] = useState(null) */

    if(!own) return <p>Loading...</p>
    if(!enemy) return <p>Loading...</p>
    {console.log("own, enemy", own, enemy)}

    useEffect(()=>{
        setMyHP(own.hp)
        setEnemyHP(enemy.hp)

        setMyMaxHP(own.hp)
        setEnemyMaxHP(enemy.hp)
    }, [own, enemy])

    useEffect(()=>{
        if(enemyHP===0){
           console.log("enemy.id: ", enemy.id)
           setMyPokemons(prev=>[...prev, `https://pokeapi.co/api/v2/pokemon/${enemy.id}`])
           setSelectedLocation(null)
       }
    }, [enemyHP])


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
                    }, 500)
                
                    return () => {
                        clearInterval(interval)
                    }
                
    }, [turn])
    

    function round(myAttack, myDefense, Z){
        let myDamage = Math.round(((((2/5+2)*myAttack*60/myDefense)/50)+2)*Z/255)
        setMyHP(prev => Math.max(0, prev - myDamage))
        console.log(myHP)
    }

        function round2(enemyAttack, enemyDefense, Z){
        let enemyDamage = Math.round(((((2/5+2)*enemyAttack*60/enemyDefense)/50)+2)*Z/255)
        setEnemyHP(prev => Math.max(0, prev - enemyDamage))
        console.log(enemyHP)
    }

    function getHpColor(current, max) {
        const ratio = current / max;

        if (ratio <= 0.25) return "#e74c3c";
        if (ratio <= 0.5) return "#f1c40f";
        return "#2ecc71"; // zöld
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
                    <p>HP: {enemyHP}</p>

                    <div className="hp-bar">
                        <div
                            className="hp-fill"
                                style={{
                                width: enemyHP ? `${(enemyHP / enemyMaxHP) * 100}%` : "100%",
                                background: getHpColor(enemyHP, enemyMaxHP)
                            }}
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
                    <p>HP: {myHP}</p>

                    <div className="hp-bar">
                        <div
                            className="hp-fill"
                                style={{
                                width: myHP ? `${(myHP / myMaxHP) * 100}%` : "100%",
                                background: getHpColor(myHP, myMaxHP)
                            }}
                        />
                    </div>
                </div>

            </div>


        </div>
    </div>
    )
}

export default Battle