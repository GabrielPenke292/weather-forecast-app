import React, { useState } from 'react';
// Certifique-se de importar o arquivo CSS correspondente para os estilos

function Search() {
    const [cities, setCities] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    async function searchInput(event) {
        let currentValue = event.target.value;

        const urlAccuWeather = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=K3rgPRk6b2GzxJgChMYMtxdQHuuxTxAB&q=${currentValue}`;
        try {
            const response = await fetch(urlAccuWeather);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if(data === undefined || data.length === 0){
                setShowSuggestions(false)
            }else{
                setShowSuggestions(currentValue.length > 0); 
                setCities(data);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
            setShowSuggestions(false)
        }
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
