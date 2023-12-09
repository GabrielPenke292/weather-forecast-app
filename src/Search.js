import React, { useState } from 'react';
// Certifique-se de importar o arquivo CSS correspondente para os estilos

function Search() {
    const [cities, setCities] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    async function searchInput(event) {
        let currentValue = event.target.value;

        const urlAccuWeather = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}&q=${currentValue}`;
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

    function getWeatherForecast(city, country){
        
        setShowSuggestions(false)
        document.getElementsByName('searchInput')[0].value = city;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`;

        fetch(url)
         .then(response => response.json())
            .then(data => {
                const {main, name, sys, weather} = data;
                console.log(data);
                if(weather !== undefined){

                    console.log(weather[0]['description']);
                }
            })
    }

    return (
        <div className='search'>
            <input type='text' name='searchInput' onKeyUp={searchInput} placeholder='Search City...' />
            {showSuggestions && (
                <div className="suggestions">
                    {cities.map((city, index) => (
                        <button key={index}  onClick={()=>getWeatherForecast(city.LocalizedName, city.Country.ID)}>
                            {city.LocalizedName}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
