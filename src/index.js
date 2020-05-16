import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import SearchForm from "./SearchForm.js";

class App extends React.Component {
  joke = null;

  constructor() {
    super();
    this.state = {
      searchTerm: "",
      jokes: [],
      isFetchingJoke: false,
    
    };
    this.searchJoke = this.searchJoke.bind(this);
    this.OnSearchChange = this.OnSearchChange.bind(this);

  }

  searchJoke(limit = 20) {
    this.setState({ isFetchingJoke: true });
    fetch(
      `https://icanhazdadjoke.com/search?term=${
        this.state.searchTerm
      }&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        const jokes = json.results;

        this.setState({
          jokes,
          isFetchingJoke: false
        });
      });
  }
 

  OnSearchChange(value) {
    this.setState({ searchTerm: value });
  }

  renderJokes() {
    return (
      <center>
      <ul>
        {this.state.jokes.map(joke => (
          <li key={joke.id}>{joke.joke}</li>
        ))}
      </ul>
      </center>
    );
  }

  render() {
    return (
      
      <div className="App">
        <img src ={require("./logo.png")} className="logo" alt="logo" />
        <SearchForm
          onFormSubmit={this.searchJoke}
          OnSearchChange={this.OnSearchChange}
          isSearching={this.state.isFetchingJoke}
          getJokes={this.searchJoke}
          
        />

        {/* Don't have to bind??*/}
        {this.state.isFetchingJoke ? "Loading Jokes..." : this.renderJokes()}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
