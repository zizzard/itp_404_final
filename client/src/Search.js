import React, { useState } from "react";
import SongTable from "./SongTable";
import "./App.css";

function Search() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  function search() {
    setLoaded(false);
    let data = {
      query: query,
    };

    fetch(`http://localhost:8080/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoaded(true);
      });
  }

  return (
    <div className="main-container">
      <h1>Search</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song, artist, album, or lyrics..."
          className="search-input"
        />
        <button onClick={search} className="search-button">
          Search
        </button>
      </div>
      {loaded && <SongTable data={data} />}
    </div>
  );
}

export default Search;
