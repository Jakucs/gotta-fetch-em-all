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
       } else if(myHP===0){
        setSelectedLocation(null)
       }
    }, [enemyHP])


    useEffect(() => {
        if (myHP === null || enemyHP === null) return
        if (myHP === 0 || enemyHP === 0) return

        const timeout = setTimeout(() => {
            const Z = Math.floor(Math.random() * (255 - 217)) + 217

            if (turn === "player") {
                round(own.attack, enemy.defense, Z)
                setTurn("enemy")
            } else {
                round2(enemy.attack, own.defense, Z)
                setTurn("player")
            }
        }, 500)

        return () => clearTimeout(timeout)
    }, [turn, myHP, enemyHP, own, enemy])

    

    function round(myAttack, enemyDefense, Z) {
        let damage = Math.round(((((2 / 5 + 2) * myAttack * 60 / enemyDefense) / 50) + 2) * Z / 255)
        setEnemyHP(prev => Math.max(0, prev - damage))
    }

    function round2(enemyAttack, myDefense, Z) {
        let damage = Math.round(((((2 / 5 + 2) * enemyAttack * 60 / myDefense) / 50) + 2) * Z / 255)
        setMyHP(prev => Math.max(0, prev - damage))
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