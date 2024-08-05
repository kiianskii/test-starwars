import { Link } from "react-router-dom";
import s from "./Header.module.css";
import React from "react";

function Header() {
  return (
    <section className={s.header}>
      <div className={s.container}>
        <img src="/star_wars_logo.png" alt="logo" className={s.logo} />
        <Link to="/" className={s.title}>
          Starwars Characters
        </Link>
      </div>
    </section>
  );
}
// Starwars Characters - made as link, so user can get back to main page easily
export default Header;
