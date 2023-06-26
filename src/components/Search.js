import React, { Component } from 'react';
export default class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {
        query: ''
      };
    }
  
    handleInputChange = (event) => {
      this.setState({ query: event.target.value });
    }
  
    handleFormSubmit = (event) => {
      event.preventDefault();
      this.props.getVenues(this.state.query);
    }
  
    render() {
      return (
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" onChange={this.handleInputChange} />
          <button type="submit">Search</button>
        </form>
      );
    }
  }
  

