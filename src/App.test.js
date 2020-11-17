import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

//Ensure that the Links are properly rendered on the home page
//Test 1 of 15
test("renders links", () => {
  render(<App />);
  expect(screen.getByText("Search for a song").closest("a")).toHaveAttribute(
    "href",
    "/search"
  );
  expect(screen.getByText("View all songs").closest("a")).toHaveAttribute(
    "href",
    "/songs"
  );
  expect(screen.getByText("Add a new songs").closest("a")).toHaveAttribute(
    "href",
    "/add"
  );
});
