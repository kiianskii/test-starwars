import { useDispatch, useSelector } from "react-redux";
import { selectHeroes, selectIsLoading, selectPage } from "../../redux/slice";
import HeroItem from "../HeroItem/HeroItem";
import s from "./HeroesList.module.css";
import { fetchMoreHeroesThunk } from "../../redux/operations";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import React from "react";

function HeroesList() {
  const heroes = useSelector(selectHeroes);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const loading = useSelector(selectIsLoading);
  const { id } = useParams();

  useEffect(() => {
    if (shouldScroll && !loading) {
      const scrollToBottom = () => {
        if (containerRef.current) {
          requestAnimationFrame(() => {
            const height =
              containerRef.current.firstElementChild?.getBoundingClientRect()
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
    <div className={s.list_wrapper}>
      {loading && <Loader />}
      <ul className={!id ? s.list : s.list_col} ref={containerRef}>
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
  );
}

export default HeroesList;
