import React from 'react'
import PokemonCard from './PokemonCard'

const PokemonBattle = ({pokemon}) => {

    return (
        <div>
            {/* {pokemon.stats.map((stat) => (
                <div className='stats-grid-item'>
                    <p className='stat-name'>{stat.stat.name}</p>
                    <p className='stat-base'>{stat.base_stat}</p>
                </div>
            ))} */}
            <PokemonCard pokemon={pokemon} />
        </div>
    )
}

export default PokemonBattle
