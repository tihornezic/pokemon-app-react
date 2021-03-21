import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import PokemonCard from './PokemonCard'
import PokemonInfo from './PokemonInfo'

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([])
    let baseUrls = []
    let urls = []

    // pagination
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(40)

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=30`)
            .then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    baseUrls = data.results
                    // console.log(baseUrls)
                    baseUrls.map(item => {
                        // for every baseUrls Pokemon, fetch its full info;
                        // that is, eg.: https://pokeapi.co/api/v2/pokemon/1/
                        fetch(`${item.url}`)
                            .then(res => res.json())
                            .then(data => {
                                if (!data.errors) {
                                    urls.push(data)
                                    urls.forEach((url) => {
                                        setPokemons([...pokemons, url])
                                    })
                                    setPokemons(urls)
                                    // console.log(urls)
                                }
                            })
                    })
                } else {
                    console.log('Error')
                }
            })
    }, [])

    // pagination
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = pokemons.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <div className='background'>
            <div className='container'>
                <div className=''>
                    {pokemons.length > 0 && (
                        <div className='pokemons-grid'>
                            {/* mapping through currentPosts instead of pokemons */}
                            {currentPosts.map(pokemon => (
                                <>
                                    <Link to={`/pokemon-${pokemon.name}`}><PokemonCard pokemon={pokemon} /></Link>
                                </>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PokemonList
