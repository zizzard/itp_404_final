import React, { useEffect } from "react";
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
import EditSong from "./EditSong";
import Songs from "./Songs";

function App() {
  useEffect(() => {
    document.title = `The Karaoke Machine`;
  }, []);
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
        <Route path="/song/edit/:id" exact={true}>
          <EditSong />
        </Route>
        <Route path="*">
          <div className="main-container">
            <h1>Page not found.</h1>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
