import { useState } from 'react'; 

import Header from "./components/Header"
import PokeCard from "./components/PokeCard"
import SideNav from "./components/SideNav"

function App() {
  const [selected_pokemon, setSelectedPokemon] = useState(0);

  return (
    <>
    <Header/>
    <SideNav selected_pokemon={selected_pokemon} setSelectedPokemon={setSelectedPokemon}/>
    <PokeCard selected_pokemon={selected_pokemon}/>
    </>
  )
}

export default App
