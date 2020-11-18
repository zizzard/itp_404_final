import React from "react";
import { render, waitFor } from "@testing-library/react";
import EditSong from "./EditSong";

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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "ud851y-H80yvxFq2tYPc5",
  }),
}));

//Test 6 of 15
//Ensures that the edit song renders properly
test("rendering editsong view", async () => {
  const component = mount(
    <Router>
      <EditSong />
    </Router>
  );

  expect(component.find("#loading").text()).toEqual("Loading...");

  await waitFor(() => {
    expect(component.text()).not.toEqual("SongLoading...");
  });
  component.update();

  let title = component.find("#title").instance().value;
  expect(title).toEqual("Nikes");
});

//Test 7 of 15
//Ensures that the edit song can be edited properly
test("rendering editsong view", async () => {
  const component = mount(
    <Router>
      <EditSong />
    </Router>
  );

  expect(component.find("#loading").text()).toEqual("Loading...");

  await waitFor(() => {
    expect(component.text()).not.toEqual("SongLoading...");
  });
  component.update();

  let title = component.find("#title").instance().value;
  expect(title).toEqual("Nikes");

  component.find("#title").simulate("change", { target: { value: "new" } });
  let newTitle = component.find("#title").instance().value;
  expect(newTitle).toEqual("new");
});
