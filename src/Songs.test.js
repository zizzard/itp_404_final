import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Songs from "./Songs";

import { BrowserRouter as Router } from "react-router-dom";

import { createServer } from "miragejs";

let server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.logging = false;

      this.get("/api/songs", () => {
        return [
          {
            title: "Nikes",
            artist: "Frank Ocean",
            album: "Blonde",
            lyrics: "Lyrics",
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

//Test 2 of 15
//Ensures that the table renders properly
test("renders table", async () => {
  const { container, getByText } = render(
    <Router>
      <Songs />
    </Router>
  );
  expect(container).toHaveTextContent("Loading...");

  await waitFor(() => {
    expect(container).not.toHaveTextContent("Loading...");
  });

  expect(getByText("Nikes")).toBeInTheDocument();
});
