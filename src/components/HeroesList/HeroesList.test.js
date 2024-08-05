import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import HeroesList from "./HeroesList";
import { selectHeroes, selectIsLoading, selectPage } from "../../redux/slice";
import HeroItem from "../HeroItem/HeroItem";
import rootReducer from "../../redux/rootReducer";

jest.mock("../../redux/slice", () => ({
  selectHeroes: jest.fn(),
  selectIsLoading: jest.fn(),
  selectPage: jest.fn(),
}));

jest.mock("../HeroItem/HeroItem", () => (props) => (
  <div>HeroItem: {props.hero.name}</div>
));

describe("HeroesList Component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    });
  });

  it("renders HeroItem components for each hero", () => {
    selectHeroes.mockReturnValue([
      { id: 1, name: "Hero 1" },
      { id: 2, name: "Hero 2" },
    ]);
    selectIsLoading.mockReturnValue(false);
    selectPage.mockReturnValue(1);

    render(
      <Provider store={store}>
        <HeroesList />
      </Provider>
    );

    expect(screen.getByText("HeroItem: Hero 1")).toBeInTheDocument();
    expect(screen.getByText("HeroItem: Hero 2")).toBeInTheDocument();
  });

  it("does not render HeroItem components if there are no heroes", () => {
    selectHeroes.mockReturnValue([]);
    selectIsLoading.mockReturnValue(false);
    selectPage.mockReturnValue(1);

    render(
      <Provider store={store}>
        <HeroesList />
      </Provider>
    );

    expect(screen.queryByText("HeroItem: Hero 1")).toBeNull();
    expect(screen.queryByText("HeroItem: Hero 2")).toBeNull();
  });
});
