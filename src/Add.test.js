import React from "react";
import { render, waitFor } from "@testing-library/react";
import Add from "./Add";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { createMemoryHistory } from "history";
import { createServer } from "miragejs";

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

let server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.logging = false;

      this.get("/api/song/ud851y-H80yvxFq2tYPc5", () => {
        return {
          title: "Nikes",
          artist: "Frank Ocean",
          album: "Blonde",
          lyrics: "Lyrics",
          id: "ud851y-H80yvxFq2tYPc5",
        };
      });
    },
  });
});
afterEach(() => {
  server.shutdown();
});

//Test 11 of 15
//Ensures that the add song renders properly
test("rendering editsong view", async () => {
  const component = mount(
    <Router>
      <Add />
    </Router>
  );

  expect(component.text()).not.toEqual("AddSong Added");
});

//Test 12 of 15
//Check html error message
test("rendering editsong view", async () => {
  const component = mount(
    <Router>
      <Add />
    </Router>
  );

  component.find("#title").simulate("change", { target: { value: "title" } });
  let newTitle = component.find("#title").instance().value;
  expect(newTitle).toEqual("title");

  component.find("#album").simulate("change", { target: { value: "album" } });
  let newAlbum = component.find("#album").instance().value;
  expect(newAlbum).toEqual("album");

  component.find("#artist").simulate("change", { target: { value: "artist" } });
  let newArtist = component.find("#artist").instance().value;
  expect(newArtist).toEqual("artist");

  let add = component.find("#add");
  add.simulate("click");

  expect(component.find("#lyric-error").text()).toEqual(
    "Please provide a lyric description for the song."
  );
});

//Test 13 of 15
//Check html add success
test("rendering editsong view", async () => {
  const component = mount(
    <Router>
      <Add />
    </Router>
  );

  component.find("#title").simulate("change", { target: { value: "title" } });
  let newTitle = component.find("#title").instance().value;
  expect(newTitle).toEqual("title");

  component.find("#album").simulate("change", { target: { value: "album" } });
  let newAlbum = component.find("#album").instance().value;
  expect(newAlbum).toEqual("album");

  component.find("#artist").simulate("change", { target: { value: "artist" } });
  let newArtist = component.find("#artist").instance().value;
  expect(newArtist).toEqual("artist");

  component.find("#lyrics").simulate("change", { target: { value: "lyrics" } });
  let newLyrics = component.find("#lyrics").instance().value;
  expect(newLyrics).toEqual("lyrics");
});
