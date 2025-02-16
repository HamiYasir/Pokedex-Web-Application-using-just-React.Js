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

    // imgList will get all the keys from the sprites
    const img_list = Object.keys(sprites || {}).filter(val =>{
        // If a sprite value is empty, ie; it does not hold any image
        if(!sprites[val]){return false}
        // We will exclude the sprites of of the pokemon from versions and others category. We only want the main sprites
        // If the val includes 'versions', 'other'
        if(['versions', 'other'].includes(val)){return false}
        // If the sprite is not any of the above, return that
        // Else return true
        return true
    });

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
            <img className="default-img" src={'/pokemon/'+getFullPokedexNumber(selected_pokemon)+'.png'} alt={`${name}-large-img`}/>
            <div className="img-container">
                {img_list.map((sprite_url, sprite_index)=>{
                    // console.log(sprite);
                    return(
                        <img key={sprite_index} src={sprites[sprite_url]} alt={`${name}-img-${sprite_url}`}/>
                    )
                })}
            </div>
            <div className="stats-card">
                {stats.map((stat_obj, stat_index)=>{
                    const { stat, base_stat } = stat_obj
                    return(
                        <div key={stat_index} className="stat-item">
                            <p>{stat?.name.replaceAll('-', ' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <h3>Moves</h3>
            <div className="pokemon-move-grid">
            {moves.map((move_obj, move_index)=>{
                // console.log(move_obj['move'].name);
                return(
                    <button key={move_index} className="button-card pokemon-move">
                        <p>{move_obj?.move?.name.replaceAll('-', ' ')}</p>
                    </button>
                )
            })}
            </div>
        </div>
    )
}

/* Caching should be done only in projects using API's that does not change frequently */