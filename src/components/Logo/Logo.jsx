import { Link } from "react-router-dom";
import css from "./Logo.module.css";

export default function Logo() {
  return (
    <Link to="/" className={css.logoLink}>
      <img src="/RentalCar.svg" alt="Logo" className={css.logo} />
    </Link>
  );
}
