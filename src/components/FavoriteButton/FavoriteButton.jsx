import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button/Button";
import Icon from "../Icon/Icon";
import { selectFavorites } from "../../redux/cars/selectors";
import css from "./FavoriteButton.module.css";
import { toast } from "react-toastify";
import { setFavorites } from "../../redux/cars/slice";

export default function FavoriteButton({ car, className }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(car.id);
  const handleFavorite = () => {
    dispatch(setFavorites(car.id));
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <Button className={className} onClick={handleFavorite}>
      <Icon
        iconName={isFavorite ? "heart-active" : "heart"}
        className={isFavorite ? css.active : css.inactive}
      />
    </Button>
  );
}
