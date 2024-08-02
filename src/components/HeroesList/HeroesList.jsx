import { useDispatch, useSelector } from "react-redux";
import { selectHeroes, selectPage } from "../../redux/slice";
import HeroItem from "../HeroItem/HeroItem";
import s from "./HeroesList.module.css";
import { fetchMoreHeroesThunk } from "../../redux/operations";

function HeroesList() {
  const heroes = useSelector(selectHeroes);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  return (
    <div className={s.list_wrapper}>
      <ul className={s.list}>
        {heroes.map((hero) => {
          return <HeroItem key={hero.id} hero={hero} />;
        })}
      </ul>
      {page < 9 && (
        <button
          className={s.more_btn}
          type="button"
          onClick={() => {
            dispatch(fetchMoreHeroesThunk(page));
          }}
        >
          Load more
        </button>
      )}
    </div>
  );
}

export default HeroesList;
