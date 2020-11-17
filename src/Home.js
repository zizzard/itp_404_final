import React from "react";
import { Link } from "react-router-dom";

import "./App.css";

function Home() {
  return (
    <div className="main-container">
      <h1>Home</h1>
      <Link className="home-link" to={`/search`} exact={true}>
        Search for a song
      </Link>
      <Link className="home-link" to={`/songs`} exact={true}>
        View all songs
      </Link>
      <Link className="home-link" to={`/add`} exact={true}>
        Add a new songs
      </Link>
    </div>
  );
}

export default Home;
