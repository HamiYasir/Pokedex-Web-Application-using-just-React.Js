// This will display all the 151 pokemon from the original pokedex
import { useState } from 'react';
import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(Props){
    const { selected_pokemon, setSelectedPokemon, hide_side_menu, handleCloseMenu } = Props;
    
    const [search_value, setSearchValue] = useState('');

    const filtered_pokemon = first151Pokemon.filter((val, val_index) => {
        // Search by id
        // If the full pokedex number includes the current search value, return true
        if((getFullPokedexNumber(val_index)).includes(search_value)){return true};
        //Search by name
        // If the pokemon name includes the current search value, return true
        if((val.toLowerCase()).includes(search_value.toLowerCase())){return true};
        // Otherwise, exclude from the array
        return false;
    });

    return(
        <nav className={" "+(!hide_side_menu ? " open" : " ")}>
            <header className={"header "+(!hide_side_menu ? " open" : " ")}>
                <button onClick={handleCloseMenu} className="open-nav-button">
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className="text-gradient">Pokédex</h1>
            </header>
            <input placeholder="Search by id or name...." value={search_value} onChange={(event)=>{setSearchValue(event.target.value)}}/>
            {filtered_pokemon.map((pokemon, pokemon_index)=>{
                const true_pokemon_index = first151Pokemon.indexOf(pokemon)
                return(
                    <button 
                        key={pokemon_index} 
                        className={"nav-card "+(pokemon_index === selected_pokemon ? ' nav-card-selected' : ' ')}
                        onClick={()=>{
                            setSelectedPokemon(true_pokemon_index)
                            handleCloseMenu()
                        }}>
                        <p>{getFullPokedexNumber(true_pokemon_index)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}