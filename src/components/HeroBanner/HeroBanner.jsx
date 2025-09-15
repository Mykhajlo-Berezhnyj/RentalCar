import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import css from "./HeroBanner.module.css";

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className={css.heroBanner}>
      <h1>Find your perfect rental car</h1>
      <p className={css.heroTxt}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <Button size="btnFillLarge" aria-label="View Catalog" className={css.btnCatalog} onClick={() => navigate("/catalog")}>
        View Catalog
      </Button>
    </section>
  );
}
