import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latlong: "",
      venues: []
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((response) => {
      this.setState(
        {
          latlong: response.coords.latitude + "," + response.coords.longitude
        },
        () => {
          this.getVenues();
        }
      );
    });
  };

  getVenues = (query) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3UPqtano6NBMcCUSI6Krdbm5YQrj9NYNgFDp2kBjl7P0='
      }
    };

    const endpoint = 'https://api.foursquare.com/v3/places/search';

    fetch(endpoint, options)
      .then(response => response.json())
      .then(data => {
        const venues = data?.results || [];
        console.log("venues data:", data);

        let filteredVenues = [];
        if (query) {
          console.log("Query:", query);
          filteredVenues = venues.filter(venue => {
            console.log("Venue categories:", venue.categories);
            const categories = venue.categories.map(category => category.name);
            console.log("Categories:", categories);
            return categories.includes(query);
          });
        }
  
  

        console.log("Filtered venues:", filteredVenues);

        this.setState({ venues: filteredVenues });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { venues } = this.state;
    console.log("Venues:", venues);

    return (
      <div>
        <Search getVenues={this.getVenues} />

        <ul>
          {venues && venues.map((venue, index) => (
            <li key={index}>
              <p>Name: {venue.name}</p>
              <p>Address: {venue.location.address}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
