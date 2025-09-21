import clsx from "clsx";
import { Button } from "../Button/Button";
import css from "./CarCard.module.css";
import { useNavigate } from "react-router-dom";
import { normalizeCarData } from "../db/normalizeCarData";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../../redux/cars/selectors";
import { setUpdateFavorites } from "../../redux/cars/slice";

export default function CarCard({ car, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { city, country, formattedKm } = normalizeCarData(car);
  const isP11 = index % 4 === 0;
  const isP12 = index % 4 === 1;
  const favorites = useSelector(selectFavorites);

  const isFavorites = favorites.some((f) => f.id === car.id);

  const handleClick = () => {
    navigate(`/catalog/${car.id}`);
    if (isFavorites) {
      dispatch(setUpdateFavorites(car));
    }
  };

  return (
    <div className={css.card}>
      <div className={css.tumb}>
        <img className={css.imgCar} src={car.img} alt={car.description} />
        <FavoriteButton
          className={css.btnFavorite}
          aria-label="button add to favorite"
          title="add to favorite"
          car={car}
        />
      </div>
      <div className={css.cardWrap}>
        <div className={css.txdWrap}>
          <ul className={clsx(css.txt, isP11 && css.txt11, isP12 && css.txt12)}>
            <li>
              {car.brand} <span className={css.modelCar}>{car.model}</span>,{" "}
              {car.year}
            </li>
            <li>${car.rentalPrice}</li>
          </ul>
          <div className={css.info}>
            <ul className={css.subTxt}>
              <li>{city}</li>
              <li>{country}</li>
              <li>{car.rentalCompany}</li>
            </ul>
            <ul className={css.subTxt}>
              <li>{car.type}</li>
              <li>{formattedKm} km</li>
            </ul>
          </div>
        </div>
        <Button
          size="btnFillLarge"
          aria-label=" go to detail page"
          onClick={handleClick}
        >
          Read more
        </Button>
      </div>
    </div>
  );
}
