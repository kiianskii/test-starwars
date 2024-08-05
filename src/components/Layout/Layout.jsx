import { Outlet, useParams } from "react-router-dom";

import s from "./Layout.module.css";

import HeroesList from "../HeroesList/HeroesList";
import Header from "../Header/Header";

function Layout() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <div className={s.layout}>
        <HeroesList />
        {id && (
          <div className={s.wrap}>
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}

export default Layout;
