import React from 'react'

const Search = () => {

    function searchInput(event) {
        let currentValue = document.querySelector('input[name="searchInput"]').value;
        /*
         Fazer requisição API depois
        */
    }
    return (
        <div className='search'>
            <input type='text' name='searchInput' onKeyUp={searchInput} />
        </div>
    )
}

export default Search