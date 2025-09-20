import clsx from "clsx";
import css from "./NavBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOrders } from "../../redux/orders/selectors";
import { selectFavorites } from "../../redux/cars/selectors";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useEffect, useState } from "react";

export default function NavBar({ theme, setTheme }) {
  const orders = useSelector(selectOrders);
  const favorites = useSelector(selectFavorites);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getActiveLinkClass = (customActive) => {
    return clsx(css.link, customActive && css.active);
  };
  const isProfile =
    location.pathname === "/favorites" || location.pathname === "/orders";

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <div className={css.wrapper}>
      <button className={css.burger} onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
      </button>
      <nav className={clsx(css.nav, isOpen && css.open)}>
        <ul className={css.list}>
          <li className={css.item}>
            <NavLink
              to="/"
              className={({ isActive }) => getActiveLinkClass(isActive)}
              onClick={handleCloseMenu}
            >
              Home
            </NavLink>
          </li>
          <li className={css.item}>
            <NavLink
              to="/catalog"
              end
              className={({ isActive }) => getActiveLinkClass(isActive)}
              onClick={handleCloseMenu}
            >
              Catalog
            </NavLink>
          </li>
        </ul>
        {(orders.length > 0 || favorites.length > 0) && (
          <NavLink
            to="/favorites"
            className={() => getActiveLinkClass(isProfile)}
            onClick={handleCloseMenu}
          >
            My profile
          </NavLink>
        )}
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </nav>
    </div>
  );
}
