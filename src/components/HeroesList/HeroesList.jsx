import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";

import s from "./HeroesList.module.css";

import { fetchMoreHeroesThunk } from "../../redux/operations";
import { selectHeroes, selectIsLoading, selectPage } from "../../redux/slice";

import HeroItem from "../HeroItem/HeroItem";
import Loader from "../Loader/Loader";

function HeroesList() {
  // useSelectors for getting info from redux store
  const heroes = useSelector(selectHeroes);
  const page = useSelector(selectPage);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const { id } = useParams();
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    //useEffect for smooth scroll after fetching more heroes
    if (shouldScroll && !loading) {
      const scrollToBottom = () => {
        if (containerRef.current) {
          requestAnimationFrame(() => {
            const height =
              containerRef.current.firstElementChild?.firstElementChild?.getBoundingClientRect()
                .height || 0;
            containerRef.current.scrollBy({
              behavior: "smooth",
              top: height * 2,
            });
          });
        }
      };

      scrollToBottom();
      setShouldScroll(false);
    }
  }, [heroes, shouldScroll, loading]);

  const handleLoadMore = () => {
    dispatch(fetchMoreHeroesThunk(page)).then(() => {
      setShouldScroll(true);
    });
  };

  return (
    <div>
      <div className={!id ? s.wrapper : s.wrapper_col} ref={containerRef}>
        {loading && <Loader />}
        <ul className={!id ? s.list : s.list_col}>
          {heroes.map((hero) => (
            <HeroItem key={hero.id} hero={hero} />
          ))}
        </ul>
        {page < 9 && (
          <button
            className={s.more_btn}
            type="button"
            onClick={handleLoadMore}
            disabled={loading}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
}

export default HeroesList;
