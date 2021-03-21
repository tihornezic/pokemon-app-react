import React from 'react'
import {Link} from 'react-router-dom'
import PokemonCard from './PokemonCard'


const PokemonInfo = ({pokemon}) => {
    return (
        <div className='background'>
            <div className='container'>
                <div className='pokemon-info'>
                    <Link to='/pokemon-list'><div className='back'><i className="fas fa-chevron-left"></i> Back</div></Link>
                    {/* Grid div */}
                    <div className='pokemon-info-content-container'>
                        <div>
                            <h1>{pokemon.name[0].toUpperCase() + pokemon.name.substr(1)}</h1>
                            <p className='species'>{pokemon.species.name[0].toUpperCase() + pokemon.species.name.substr(1)}</p>
                            <p className='label-name'>Abilities</p>
                            <div className='abilities'>
                                {pokemon.abilities.map((ability, index) => (
                                    <span>{(index ? ', ' : '') + ability.ability.name[0].toUpperCase() + ability.ability.name.substr(1)}</span>
                                ))}
                            </div>
                            <p className='label-name'>Stats</p>
                            <div className='stats-grid'>
                                {pokemon.stats.map((stat) => (
                                    <div className='stats-grid-item'>
                                        <p className='stat-name'>{stat.stat.name[0].toUpperCase() + stat.stat.name.substr(1)}</p>
                                        <p className='stat-base'>{stat.base_stat}</p>
                                        <p className='stat-effort'>{stat.effort}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <PokemonCard pokemon={pokemon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonInfo
