import React from "react";
import { render, screen } from "@testing-library/react";
import HeroItem from "./HeroItem";
import { BrowserRouter as Router } from "react-router-dom";

describe("HeroItem Component", () => {
  const hero = {
    id: "1",
    name: "Luke Skywalker",
  };

  it("renders the hero image with correct src and alt attributes", () => {
    render(
      <Router>
        <HeroItem hero={hero} />
      </Router>
    );
    const heroImg = screen.getByAltText(hero.name);
    expect(heroImg).toBeInTheDocument();
    expect(heroImg).toHaveAttribute(
      "src",
      `https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`
    );
  });

  it("renders the hero name as a link with correct href attribute", () => {
    render(
      <Router>
        <HeroItem hero={hero} />
      </Router>
    );
    const heroLink = screen.getByText(hero.name);
    expect(heroLink).toBeInTheDocument();
    expect(heroLink).toHaveAttribute("href", `/${hero.id}`);
  });
});
