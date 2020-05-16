import React from "react";
import "./SearchForm.css";
const SearchForm = props => {
  const onSubmit = event => {
    event.preventDefault();
    props.onFormSubmit();
  };

  return (
    <div>
      <form className="search-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search for jokes"
          onChange={event => props.OnSearchChange(event.target.value)}
        />

        <div>
          <button onClick={props.onFormSubmit} disabled={props.isSearching}>
            Search
          </button>

          <button
            onClick={() => props.getJokes(1)}
            disabled={props.isSearching}
          >
            I'm Feeling Funny
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
