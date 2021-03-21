import React from 'react'

const PokemonCard = ({pokemon}) => {

    return (
        <>
            {window.location.pathname === '/pokemon-list'
                ?
                <div className='pokemon-outside-outline'>
                    <div className='pokemon-card'>
                        <img src={`${pokemon.sprites.other["official-artwork"].front_default}`} alt={``} width='250' />
                        <p>{pokemon.name[0].toUpperCase() + pokemon.name.substr(1)}</p>
                    </div>
                </div>
                :
                <div className='pokemon-outside-outline'>
                    <div className='pokemon-card'>
                        <img src={`${pokemon.sprites.other["official-artwork"].front_default}`} alt={``} width='250' />
                        <p>{pokemon.name[0].toUpperCase() + pokemon.name.substr(1)}</p>
                        <div className='shadow'></div>
                    </div>
                </div>
            }
        </>
    )
}

export default PokemonCard
