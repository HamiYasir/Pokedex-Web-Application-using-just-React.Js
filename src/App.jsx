import { useState } from 'react'; 

import Header from "./components/Header"
import PokeCard from "./components/PokeCard"
import SideNav from "./components/SideNav"

function App() {
  const [selected_pokemon, setSelectedPokemon] = useState(0);
  const [hide_side_menu, setHideSideMenu] = useState(true);

  function handleToggleMenu(){
    setHideSideMenu(!hide_side_menu);
  }

  function handleCloseMenu(){
    setHideSideMenu(true);
  }

  return (
    <>
    <Header handleToggleMenu={handleToggleMenu}/>
    <SideNav selected_pokemon={selected_pokemon} setSelectedPokemon={setSelectedPokemon} hide_side_menu={hide_side_menu} handleCloseMenu={handleCloseMenu}/>
    <PokeCard selected_pokemon={selected_pokemon}/>
    </>
  )
}

export default App
