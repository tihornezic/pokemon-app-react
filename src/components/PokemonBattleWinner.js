import React from 'react'
import {Link} from 'react-router-dom'
import PokemonCard from './PokemonCard'

const PokemonBattleWinner = ({winnerPokemon}) => {

    const refreshPage = () => {
        window.location.reload(false)
    }

    return (
        <div className='background-flex-column'>
            <div className='container'>
                <div className='battle-winner'>
                    <h1>Winner!</h1>
                    <PokemonCard pokemon={winnerPokemon} />
                    <div className='end-buttons'>
                        <div><Link className='start-new-btn'>Start new battle</Link></div>
                        <div><p onClick={refreshPage} className='end-game-btn'>End game</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonBattleWinner
