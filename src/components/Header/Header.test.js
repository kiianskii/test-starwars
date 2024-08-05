import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
  it("renders the logo image with correct src and alt attributes", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const logoImg = screen.getByAltText("logo");
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute("src", "/star_wars_logo.png");
  });

  it("renders the title link with the correct text and href attribute", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const titleLink = screen.getByText("Starwars Characters");
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", "/");
  });
});
