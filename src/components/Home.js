import React from 'react'
import logo from '../img/img_poke_logo.png'
import {useState, useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
import {Link} from 'react-router-dom'
import PokemonBattle from './PokemonBattle'
import PokemonBattleWinner from './PokemonBattleWinner'
import PokemonCard from './PokemonCard'


const Home = () => {
    const [pokemons, setPokemons] = useState([])
    const [show, setShow] = useState(true)

    let fetchedUrl = []
    let firstPokemon

    let firstPokemonFightData = []
    let secondPokemonFightData = []

    let firstPokemonHp
    let secondPokemonHp

    let firstPokemonFull
    let secondPokemonFull

    const [fightDone, setFightDone] = useState(false)
    const [winnerPokemon, setWinnerPokemon] = useState([])


    const props = useSpring({opacity: 1, from: {opacity: 0}, config: {duration: 4500}, onRest: () => (setFightDone(true), console.log(fightDone))})

    // to be refactored with async await or promise.all
    const fetchDataAndShuffle = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`)
            .then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    // console.log(data)
                    const shuffled = data.results.sort(() => 0.5 - Math.random())
                    let selected = shuffled.slice(0, 2)
                    fetchedUrl = [...selected]
                    // console.log(fetchedUrl[1].url)
                } else {
                    console.log('Error')
                }
            })
            // fetch first random pokemon's URL
            .then(() => {
                return fetch(`${fetchedUrl[0].url}`)
            })
            .then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    // save all firstPokemon data 
                    firstPokemon = data
                    firstPokemonFightData.push(firstPokemon)
                    setPokemons([firstPokemon])
                } else {
                    console.log('Error')
                }
            })
            // fetch second random pokemon's URL
            .then(() => {
                return fetch(`${fetchedUrl[1].url}`)
            })
            .then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    // save all secondPokemon data
                    const secondPokemon = data
                    secondPokemonFightData.push(secondPokemon)
                    console.log(secondPokemonFightData)
                    // spread the firstPokemon along with second pokemon and save it in the pokemons array
                    setPokemons(firstPokemon => [...firstPokemon, secondPokemon])
                } else {
                    console.log('Error')
                }
            })
            .then(() => {
                handleFight()
            })
            .catch(error => console.log(error));

    }

    const hideImgAndButton = () => {
        setShow(prev => !prev)
    }

    const handleFight = () => {
        // console.log(firstPokemonFightData[0].stats[0].base_stat)
        firstPokemonHp = firstPokemonFightData[0].stats[0].base_stat
        firstPokemonFull = firstPokemonFightData[0]
        secondPokemonHp = secondPokemonFightData[0].stats[0].base_stat
        secondPokemonFull = secondPokemonFightData[0]
        // console.log(firstPokemonHp)
        // console.log(secondPokemonHp)
        compareHp(firstPokemonHp, secondPokemonHp, firstPokemonFull, secondPokemonFull)
    }

    // so far, I made the pokemon with greater hp win
    const compareHp = (firstPokemonHp, secondPokemonHp, firstPokemonFull, secondPokemonFull) => {
        // console.log(firstPokemonHp)
        // console.log(secondPokemonHp)
        if (firstPokemonHp > secondPokemonHp) {
            console.log('First Pokemon Wins!')
            localStorage.setItem('winner-pokemon', JSON.stringify(firstPokemonFull))
            const firstWinner = localStorage.getItem('winner-pokemon')
            if (firstWinner) {
                setWinnerPokemon(JSON.parse(firstWinner))
            }
        } else {
            console.log('Second Pokemon Wins')
            localStorage.setItem('winner-pokemon', JSON.stringify(secondPokemonFull))
            const secondWinner = localStorage.getItem('winner-pokemon')
            if (secondWinner) {
                setWinnerPokemon(JSON.parse(secondWinner))
            }
        }
    }

    return (
        <div>
            {show ?
                <div className='container'>
                    <div className='home'>
                        <div className='img-div'><img src={logo} alt="poke-logo" width='600px' /></div>
                        <div className='img-div-media'><img src={logo} alt="poke-logo" width='300px' /></div>
                        <Link to='' onClick={() => {hideImgAndButton(); fetchDataAndShuffle();}} className='btn btn-primary'>Start pokemon battle</Link>
                    </div>
                </div>
                :
                fightDone == false ?
                    <animated.div style={props}>
                        <div className='background-flex'>
                            {pokemons.length > 0 && (
                                <ul className='results'>
                                    {pokemons.map((pokemon) => (
                                        <>
                                            <li key={pokemon.id}>
                                                <PokemonBattle pokemon={pokemon} />
                                            </li>
                                            <li className='vs'>vs</li>
                                        </>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </animated.div>
                    :
                    <>
                        <PokemonBattleWinner winnerPokemon={winnerPokemon} />
                    </>
            }
        </div >
    )
}


export default Home
