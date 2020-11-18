import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SongTable from "./SongTable";

import { BrowserRouter as Router } from "react-router-dom";

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

let normal_data = [
  {
    title: "Nikes",
    artist: "Frank Ocean",
    album: "Blonde",
    lyrics: "testing the lyrics",
    id: "ud851y-H80yvxFq2tYPc5",
  },
  {
    title: "LYRICS",
    artist: "LYYYYRICS",
    album: "Amine",
    lyrics: "More lyrics",
    id: "d7fw1U7BtU33raD57kfEL",
  },
];

let no_data = [];

//Test 8 of 15
//Ensures that the table headers renders properly
test("renders table", async () => {
  const component = mount(
    <Router>
      <SongTable data={normal_data} />
    </Router>
  );
  expect(component.find("thead").text()).toEqual(
    "Link To KaraokeSong TitleArtistAlbum"
  );
});

//Test 9 of 15
//Ensures that the table body renders properly with data
test("renders table", async () => {
  const component = mount(
    <Router>
      <SongTable data={normal_data} />
    </Router>
  );
  expect(component.find("tbody").text()).toEqual(
    "Song PageNikesFrank OceanBlondeSong PageLYRICSLYYYYRICSAmine"
  );
});

//Test 10 of 15
//Ensures that the table body renders properly with no data
test("renders table", async () => {
  const component = mount(
    <Router>
      <SongTable data={no_data} />
    </Router>
  );
  expect(component.find("p").text()).toEqual("No songs found");
});
