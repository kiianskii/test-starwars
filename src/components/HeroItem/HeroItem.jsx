import { Link } from "react-router-dom";
import s from "./HeroItem.module.css";
import React from "react";

function HeroItem({ hero }) {
  return (
    <li className={s.wrapper}>
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
        alt={hero.name}
        width={180}
        height={180}
      />

      <Link className={s.hero} to={`/${hero.id}`}>
        {hero.name}
      </Link>
    </li>
  );
}
// Component for render one hero card
export default HeroItem;
