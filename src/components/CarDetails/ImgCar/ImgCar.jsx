import FavoriteButton from "../../../FavoriteButton/FavoriteButton";
import css from "./ImgCar.module.css";

export default function ImgCar({ car }) {   
  return (
    <div className={css.tumb}>
      <img className={css.imgCar} src={car.img} alt={car.description} />
      <FavoriteButton className={css.btnFavorite} car={car} />
    </div>
  );
}
