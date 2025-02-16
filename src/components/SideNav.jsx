// This will display all the 151 pokemon from the original pokedex
import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(){
    return(
        <nav>
            <header className={"header"}>
                <h1 className="text-gradient">Pokédex</h1>
            </header>
            <input/>
            {first151Pokemon.map((pokemon, pokemon_index)=>{
                return(
                    <button key={pokemon_index} className={"nav-card "}>
                        <p>{getFullPokedexNumber(pokemon_index)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}