import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";


const App = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    getVenues();
  }, []);
  

  const getVenues = (query) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.REACT_APP_SECRETAPI
      }
    };

    const endpoint = 'https://api.foursquare.com/v3/places/search?radius=5000&limit=30';

    fetch(endpoint, options)
      .then(response => response.json())
      .then(data => {
        const venuesData = data?.results || [];
        let filteredVenues = [];

        if (query && query.toLowerCase() !== 'all') {
          filteredVenues = venuesData.filter(venue => {
            const categories = venue.categories.map(category => category.name.toLowerCase());
            return categories.includes(query.toLowerCase());
          });
        } else {
          filteredVenues = venuesData;
        }

        setVenues(filteredVenues);
        console.log(filteredVenues)
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="container">
      <h1 className="my-4">Venue Search</h1>

      <Search getVenues={getVenues} />

      <ul className="list-group my-4">
        {venues.map((venue, index) => (
          <li className="list-group-item" key={index}>
            <p>Name: {venue.name}</p>
            <p>Address: {venue.location.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
