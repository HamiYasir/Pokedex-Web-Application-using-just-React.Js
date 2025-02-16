// This is what will be returned if the pokemon from sidenav is selected. It will hold all info about the selcted pokemon

import { useEffect, useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";

export default function PokeCard(props){
    const { selected_pokemon } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Destructring the fetched data
    const { name, height, abilities, stats, types, moves, sprites } = data || {};

    useEffect(()=>{
        // if loading, exit 
        if(loading || !localStorage || data){return}
        // check if the selected pokemon info is available in the cache. This is done in 3 steps
        // 1. define the cache
        console.log('Defining cache');
        let cache = {};
        if(localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokedex'));
        }
        
        // 2. check if the sleected pokemon is in the cahce, otherwise fetch from API
        if(selected_pokemon in cache){
            //read from cache
            console.log('Fetching pokemon from cache');
            setData(cache[selected_pokemon]);
            return
        }
        // else fetch from API
        async function fetchPokemonData(){
            setLoading(true);
            try{
                // Fetching the data
                console.log('Fetching pokemon from API');
                const base_url = 'https://pokeapi.co/api/v2/';
                const suffix = 'pokemon/' + first151Pokemon[selected_pokemon];
                const final_url = base_url + suffix;
                const res = await fetch(final_url);
                // console.log('res='+res);
                const pokemon_data = await res.json();
                // console.log('pokemon_data='+res);
                setData(pokemon_data);
                
                // caching the retrived data so that it can be accessed from cahe next time
                cache[selected_pokemon] = pokemon_data;
                localStorage.setItem('pokedex', JSON.stringify(cache));
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
            }
        }

        fetchPokemonData();
        //3. if we fetch from the API, make sure to stash it in the cache
    }, [selected_pokemon]);

    if(loading || !data){
        console.log('loading...');
        return(
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }

    return(
        <div className="poke-card">
            <div>
                <h4>#{getFullPokedexNumber(selected_pokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((type_obj, type_index)=>{
                    return(
                        <TypeCard key={type_index} type={type_obj?.type?.name}/>
                    )
                })}
            </div>
        </div>
    )
}

/* Caching should be done only in projects using API's that does not change frequently */