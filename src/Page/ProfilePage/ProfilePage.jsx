import { useSelector } from "react-redux";
import { selectOrders } from "../../redux/orders/selectors";
import css from "./ProfilePage.module.css";
import Container from "../../components/Container/Container";
import { useLocation } from "react-router-dom";
import UserBar from "../../components/UserBar/UserBar";
import { selectFavorites } from "../../redux/cars/selectors";
import OrderList from "../../components/OrdersList/OrdersList";
import CardList from "../../components/CarList/CarList";

export default function ProfilePage() {
  const orders = useSelector(selectOrders);
  const favorites = useSelector(selectFavorites);
  const location = useLocation();
  const isFavorites = location.pathname.includes("favorites");
  const isOrders = location.pathname.includes("orders");

  return (
    <Container >
      <div className={css.Wrapper} >
        <UserBar />
        {isFavorites &&
          (favorites.length === 0 ? (
            <p className={css.noCars}>No cars found. You have no favorites </p>
          ) : (
            <CardList cars={favorites} />
          ))}
        {isOrders && <OrderList orders={orders} />}
      </div>
    </Container>
  );
}
