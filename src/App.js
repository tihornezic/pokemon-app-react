import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useState} from 'react'
import {useEffect} from 'react'
import Home from './components/Home'
import Header from './components/Header'
import PokemonList from './components/PokemonList'
import PokemonBattle from './components/PokemonBattle'
import PokemonInfo from './components/PokemonInfo'


function App() {
  const [pokemons, setPokemons] = useState([])
  let baseUrls = []
  let urls = []

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
                }
              })
          })
        } else {
          console.log('Error')
        }
      })
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Header />
          <Home />
        </Route>
        <Route path='/pokemon-list'>
          <Header />
          <PokemonList />
        </Route>
        <Route path='/pokemon-battle'>
          <Header />
          <PokemonBattle />
        </Route>

        {pokemons.map(pokemon => (
          <Route key={pokemon.id} path={`/pokemon-${pokemon.name}`}>
            <Header />
            <PokemonInfo pokemon={pokemon} />
          </Route>
        ))}

      </Switch>
    </Router>
  );
}


export default App;
