import clsx from "clsx";
import { Button } from "../Button/Button";
import css from "./CarCard.module.css";
import { useNavigate } from "react-router-dom";
import { normalizeCarData } from "../db/normalizeCarData";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

export default function CarCard({ car, index }) {
  const navigate = useNavigate();
  const { city, country, formattedKm } = normalizeCarData(car);
  const isP11 = index % 4 === 0;
  const isP12 = index % 4 === 1;

  return (
    <div className={css.card}>
      <div className={css.tumb}>
        <img className={css.imgCar} src={car.img} alt={car.description} />
        <FavoriteButton className={css.btnFavorite} car={car} />
      </div>
      <div className={css.cardWrap} >
        <div className={css.txdWrap} >
          <div className={clsx(css.txt, isP11 && css.txt11, isP12 && css.txt12)}>
            <p>
              {car.brand} <span className={css.modelCar}>{car.model}</span>,{" "}
              {car.year}
            </p>
            <p>${car.rentalPrice}</p>
          </div>
          <div className={css.info}>
            <div className={css.subTxt}>
              <p>{city}</p>
              <p>{country}</p>
              <p>{car.rentalCompany}</p>
            </div>
            <div className={css.subTxt}>
              <p>{car.type}</p>
              <p>{formattedKm} km</p>
            </div>
          </div>
        </div>
        <Button
          size="btnFillLarge"
          onClick={() => navigate(`/catalog/${car.id}`)}
        >
          Read more
        </Button>
      </div>
    </div>
  );
}
