import clsx from "clsx";
import css from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOrders } from "../../redux/orders/selectors";

export default function NavBar() {
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  const orders = useSelector(selectOrders);
  console.log("🚀 ~ NavBar ~ orders:", orders.length);

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
      {orders.length > 0 && (
        <NavLink to="/orders" className={getActiveLinkClass}>
          My orders
        </NavLink>
      )}
    </nav>
  );
}
