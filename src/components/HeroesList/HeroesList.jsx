import { useSelector } from "react-redux";
import { selectHeroes } from "../../redux/slice";
import HeroItem from "../HeroItem/HeroItem";
import s from "./HeroesList.module.css";

function HeroesList() {
  const heroes = useSelector(selectHeroes);

  return (
    <div>
      <h1>StarWars Heroes</h1>
      <ul className={s.list}>
        {heroes.map((hero) => {
          return <HeroItem key={hero.id} hero={hero} />;
        })}
      </ul>
    </div>
  );
}

export default HeroesList;
