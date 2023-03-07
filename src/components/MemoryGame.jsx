import React, { useEffect, useState } from 'react'
import './memoryGame.css';
import SingleCard from './SingleCard';

const cardImages = [
    { "imgSource": "/memory-game-img/jaguar.jpg", matched: false },
    { "imgSource": "/memory-game-img/audi.jpg", matched: false },
    { "imgSource": "/memory-game-img/lamborghini.jpg", matched: false },
    { "imgSource": "/memory-game-img/bmw.jpg", matched: false },
    { "imgSource": "/memory-game-img/mercedes.jpg", matched: false },
    { "imgSource": "/memory-game-img/porsche.jpg", matched: false },
    { "imgSource": "/memory-game-img/ferrari.jpg", matched: false },
    { "imgSource": "/memory-game-img/mclaren.jpg", matched: false },

]

export default function MemoryGame() {

    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [disabled, setDisabled] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        setCards(shuffledCards)
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

    }

    useEffect(() => {
        shuffleCards()
    }, [])

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.imgSource === choiceTwo.imgSource) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.imgSource === choiceOne.imgSource) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => { resetTurn() }, 1000)

            }
        }
    }, [choiceOne, choiceTwo])

    console.log(cards)

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    return (
        <div className='memoryGame'>
            <h1>Memory Game</h1>
            <button
                onClick={shuffleCards}>New game</button>
            <p>Turns: {turns}</p>
            <div className='card-grid'>
                {cards.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>

    )
}
