import {urls} from '../constants/constants'

export const useFetchPokemon = async (dexNum) => {
    const response = await fetch(`${urls.pokemonPath}/${dexNum}`)
    console.log('response', response)
    //const data = await response.json()
    const {name, sprites : {front_default : img} } = await response.json()
    //console.log('data', data)

    return [
        name,
        img
    ]
}