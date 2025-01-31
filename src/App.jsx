// import { useState, useRef, useEffect } from "react"
// import Die from './assets/Die.jsx'
// import { nanoid } from "nanoid"
// import Confetti from "react-confetti"
// import './App.css'

// export default function App() {
//     const [dice, setDice] = useState(() => generateAllNewDice())
//     const buttonRef = useRef(null)

//     const gameWon = dice.every(die => die.isHeld) &&
//         dice.every(die => die.value === dice[0].value)
        
//     useEffect(() => {
//         if (gameWon) {
//             buttonRef.current.focus()
//         }
//     }, [gameWon])

//     function generateAllNewDice() {
//         return new Array(10)
//             .fill(0)
//             .map(() => ({
//                 value: Math.ceil(Math.random() * 6),
//                 isHeld: false,
//                 id: nanoid()
//             }))
//     }
    
//     function rollDice() {
//         if (!gameWon) {
//             setDice(oldDice => oldDice.map(die =>
//                 die.isHeld ?
//                     die :
//                     { ...die, value: Math.ceil(Math.random() * 6) }
//             ))
//         } else {
//             setDice(generateAllNewDice())
//         }
//     }

//     function hold(id) {
//         setDice(oldDice => oldDice.map(die =>
//             die.id === id ?
//                 { ...die, isHeld: !die.isHeld } :
//                 die
//         ))
//     }

//     const diceElements = dice.map(dieObj => (
//         <Die
//             key={dieObj.id}
//             value={dieObj.value}
//             isHeld={dieObj.isHeld}
//             hold={() => hold(dieObj.id)}
//         />
//     ))

//     return (
//         <main>
//             {gameWon && <Confetti />}
//             <div aria-live="polite" className="sr-only">
//                 {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
//             </div>
//             <h1 className="title">Tenzies</h1>
//             <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
//             <div className="dice-container">
//                 {diceElements}
//             </div>
//             <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
//                 {gameWon ? "New Game" : "Roll"}
//             </button>
//         </main>
//     )
// }


//starting fresh

import'./App.css'
import Die from './assets/Die.jsx'
import { useState } from 'react';
import {nanoid} from 'nanoid';

export default function App(){
    const [dice, setDice] = useState(generateAllNewDice());

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false, 
                id: nanoid()
            }))
    }

    console.log(generateAllNewDice());

    const diceElements = dice.map(dieObj => (
        <Die 
        key={dieObj.id} 
        value={dieObj.value} 
        isHeld={dieObj.isHeld}
        hold={() => hold(dieObj.id)}
        />)
    )

    function hold(id) {
        setDice(oldDice => {
            return oldDice.map(die => {
                return die.id === id ?
                    {...die, isHeld: !die.isHeld} :
                    die
            })
        })
    }

    function rollDice(){
        setDice(oldDice => oldDice.map( die => {
            die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
        }))
    }

    return(
        <main>
            <h1>Tenzies</h1>
            <h4>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h4>
            <div className="die-container">
                {diceElements}
            </div>
            <button className='roll-btn' onClick={rollDice}>Roll</button>
        </main>
    )
}
