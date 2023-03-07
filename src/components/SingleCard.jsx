import React from 'react'
import './memoryGame.css';


export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div
            className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img
                    className='front'
                    src={card.imgSource}
                    alt='card front' />
                <img
                    className='back'
                    src="/memory-game-img/card-back.jpg"
                    alt='card back'
                    onClick={handleClick} />
            </div>
        </div>
    )
}
