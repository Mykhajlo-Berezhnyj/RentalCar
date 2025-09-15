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
  // const isFavorite = favorites.includes(car.id);
  const isFavorite = favorites.some((fav) => fav.id === car.id);
  const handleFavorite = () => {
    dispatch(setFavorites(car));
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <Button
      className={className}
      onClick={handleFavorite}
      aaria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Icon
        iconName={isFavorite ? "heart-active" : "heart"}
        className={isFavorite ? css.active : css.inactive}
      />
    </Button>
  );
}
