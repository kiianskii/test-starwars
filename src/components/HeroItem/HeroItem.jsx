import { Link } from "react-router-dom";
import s from "./HeroItem.module.css";

function HeroItem({ hero }) {
  return (
    <li className={s.wrapper}>
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
        alt={hero.name}
        width={200}
        height={220}
      />

      <Link to={`/${hero.id}`}>{hero.name}</Link>
    </li>
  );
}

export default HeroItem;
