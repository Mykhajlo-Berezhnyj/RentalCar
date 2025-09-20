import { Link } from "react-router-dom";
import css from "./Logo.module.css";
import Icon from "../Icon/Icon";

export default function Logo() {
  return (
    <Link to="/" className={css.logoLink}>
      <svg className={css.logo}>
        <use href={`/RentalCar.svg?v=${__BUILD_VERSION__}`}></use>
      </svg>
    </Link>
  );
}
