import React, { useState } from 'react';

const Search = ({ getVenues }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    getVenues(query);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" onChange={handleInputChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;

  

