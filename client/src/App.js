import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import "./App.css";

import Add from "./Add";
import Home from "./Home";
import Search from "./Search";
import Song from "./Song";
import Songs from "./Songs";

function App() {
  return (
    <Router>
      <div className="header">
        <NavLink className="home" to={`/`} exact={true}>
          The Karaoke Machine
        </NavLink>
      </div>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/search" exact={true}>
          <Search />
        </Route>
        <Route path="/add" exact={true}>
          <Add />
        </Route>
        <Route path="/songs" exact={true}>
          <Songs />
        </Route>
        <Route path="/song/:id" exact={true}>
          <Song />
        </Route>
        <Route path="*">
          <h1>Page not found.</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
