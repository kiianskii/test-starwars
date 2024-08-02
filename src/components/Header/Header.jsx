import { Link } from "react-router-dom";
import s from "./Header.module.css";

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

export default Header;
