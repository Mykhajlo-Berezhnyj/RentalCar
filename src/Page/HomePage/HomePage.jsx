import HeroBanner from "../../components/HeroBanner/HeroBanner";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.heroSection} >
      <HeroBanner />
    </div>
  );
}
