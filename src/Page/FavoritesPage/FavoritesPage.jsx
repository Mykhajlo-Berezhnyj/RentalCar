import { useSelector } from "react-redux";
import CardList from "../../components/CarList/CarList";
import UserBar from "../../components/UserBar/UserBar";
import { selectFavorites } from "../../redux/cars/selectors.js";
import css from "./FavoritesPage.module.css";
import Container from "../../components/Container/Container.jsx";

export default function FavoritesPage() {
  const favorites = useSelector(selectFavorites);

  return (
    <Container className={css.sectionFav} >
      <UserBar />
      {favorites.length === 0 ? (
        <p className={css.noCars}>No cars found. You have no favorites </p>
      ) : (
        <CardList cars={favorites} />
      )}
    </Container>
  );
}
