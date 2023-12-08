import React from 'react'

const Search = () => {

    function searchInput(event) {
        let currentValue = document.querySelector('input[name="searchInput"]').value;
        /*
         Fazer requisição API depois
        */
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&APPID=4b280f067015f08032ff03d7bb174c40`;
       fetch(url)
         .then(response => response.json())
            .then(data => {
                const {main, name, sys, weather} = data;
                console.log(data);
                if(weather !== undefined){

                    // console.log(weather[0]['description']);
                }
            })
    }
    return (
        <div className='search'>
            <input type='text' name='searchInput' onKeyUp={searchInput} placeholder='Search City...'/>
        </div>
    )
}

export default Search