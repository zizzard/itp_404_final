import React from "react";
import { render, waitFor } from "@testing-library/react";
import Search from "./Search";

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

      this.post("/api/search", () => {
        return [
          {
            title: "Nikes",
            artist: "Frank Ocean",
            album: "Blonde",
            lyrics: "testing the lyrics",
            id: "ud851y-H80yvxFq2tYPc5",
          },
        ];
      });
    },
  });
});
afterEach(() => {
  server.shutdown();
});

//Test 14 of 15
//Ensure search renders properly and is editable
test("rendering editsong view", async () => {
  const component = mount(
    <Router>
      <Search />
    </Router>
  );

  component.find("input").simulate("change", { target: { value: "Nikes" } });
  let newTitle = component.find("input").instance().value;
  expect(newTitle).toEqual("Nikes");
});

//Test 15 of 15
//Perform Search
test("rendering editsong view", async () => {
  const component = mount(
    <Router>
      <Search />
    </Router>
  );

  component.find("input").simulate("change", { target: { value: "Nikes" } });
  let newTitle = component.find("input").instance().value;
  expect(newTitle).toEqual("Nikes");

  let btn = component.find("button");
  btn.simulate("click");

  await waitFor(() => {
    expect(component.text()).not.toEqual("SearchSearch");
  });
  component.update();

  expect(component.find("tbody").text()).toEqual(
    "Song PageNikesFrank OceanBlonde"
  );
});
