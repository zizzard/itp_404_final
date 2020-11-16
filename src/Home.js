import React from "react";
import { NavLink } from "react-router-dom";

import "./App.css";

function Home() {
  return (
    <div className="main-container">
      <h1>Home</h1>
      <NavLink className="home-link" to={`/search`} exact={true}>
        Search for a song
      </NavLink>
      <NavLink className="home-link" to={`/songs`} exact={true}>
        View all songs
      </NavLink>
      <NavLink className="home-link" to={`/add`} exact={true}>
        Add a new songs
      </NavLink>
    </div>
  );
}

export default Home;
