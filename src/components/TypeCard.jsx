// This will render out cards based on the type of pokemon
// default makes it so that when importing, the default component is exported by default(ie, without destructuring it on import})

import { pokemonTypeColors } from "../utils";

export default function TypeCard(props){
    const { type } = props;

    return(
        <div className="type-tile" style={{color: pokemonTypeColors?.[type]?.color , background: pokemonTypeColors?.[type]?.background}}>
            <p>{type}</p>
        </div>
    )
}