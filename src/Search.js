import React, { useState } from 'react';
// Certifique-se de importar o arquivo CSS correspondente para os estilos

function Search() {
    const [cities, setCities] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    function searchInput(event) {
        let currentValue = event.target.value;
        setShowSuggestions(currentValue.length > 0);  // Mostra as sugestões se houver texto no input

        const urlAccuWeather = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=K3rgPRk6b2GzxJgChMYMtxdQHuuxTxAB&q=${currentValue}`;
        fetch(urlAccuWeather)
            .then(response => response.json())
            .then(data => {
                setCities(data);
            });
    }

    return (
        <div className='search'>
            <input type='text' name='searchInput' onKeyUp={searchInput} placeholder='Search City...' />
            {showSuggestions && (
                <div className="suggestions">
                    {cities.map((city, index) => (
                        <button key={index} onClick={() => console.log(city.Key)}>
                            {city.LocalizedName}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
