import clsx from "clsx";
import css from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li className={css.item}>
          <NavLink to="/" className={getActiveLinkClass}>
            Home
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink to="/catalog" className={getActiveLinkClass}>
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
