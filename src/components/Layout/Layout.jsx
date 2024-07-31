import { Outlet } from "react-router-dom";
import HeroesList from "../HeroesList/HeroesList";

import s from "./Layout.module.css";

function Layout() {
  return (
    <div className={s.layout}>
      <HeroesList />
      <div className={s.wrap}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
