import { NavLink, useLocation } from "react-router-dom";
import css from "./UserBar.module.css";
import clsx from "clsx";

export default function UserBar() {

  const getActiveLinkClass = ({isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.userBar}>
      <NavLink to="/favorites" end className={getActiveLinkClass}>
        Favorites
      </NavLink>
      <NavLink to="/orders" end className={getActiveLinkClass}>
        Orders
      </NavLink>
    </nav>
  );
}
