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
        return [];
      });
    },
  });
});
afterEach(() => {
  server.shutdown();
});

//Test 3 of 15
//Ensures that the table renders properly when no songs are provided
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

  expect(getByText("No songs found")).toBeInTheDocument();
});
