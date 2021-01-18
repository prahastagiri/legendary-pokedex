function getPokemonData(data) {
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/'+data.pokemon.name.toLowerCase();
    
    return fetch(apiUrl, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson) {
            return responseJson;
        }
    })
    .catch((error) => {
        return { error: true, message: error };
    });
}
function getPokemonDesc(id) {
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon-species/'+id;
    
    return fetch(apiUrl, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson) {
            for(var i = 0; i < responseJson.flavor_text_entries.length;i++){
                var e = responseJson.flavor_text_entries;
                if(e[i].language.name==="en"){
                    return e[i].flavor_text
                }
            }
        }
    })
    .catch((error) => {
        return { error: true, message: error };
    });
}

export const PokemonService = {
    getPokemonData,
    getPokemonDesc
}
