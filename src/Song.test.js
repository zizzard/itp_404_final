import React from "react";
import { render, waitFor } from "@testing-library/react";
import Song from "./Song";

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

//Test 4 of 15
//Ensures that the song renders properly
test("rendering song view", async () => {
  const { container, getByText } = render(
    <Router>
      <Song />
    </Router>
  );

  expect(container).toHaveTextContent("Loading...");

  await waitFor(() => {
    expect(container).not.toHaveTextContent("Loading...");
  });

  expect(getByText("Nikes")).toBeInTheDocument();
});

//Test 5 of 15
//Ensures that the song renders properly
test("clicking edit route", async () => {
  const component = mount(
    <Router>
      <Song />
    </Router>
  );

  expect(component.find("#loading").text()).toEqual("Loading...");

  await waitFor(() => {
    expect(component.text()).not.toEqual("SongLoading...");
  });
  component.update();

  let edit = component.find("#edit");
  edit.simulate("click");
});
