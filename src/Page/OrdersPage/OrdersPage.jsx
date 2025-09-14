import { useSelector } from "react-redux";
import { selectOrders } from "../../redux/orders/selectors";
import css from "./OrdersPage.module.css";
import Container from "../../components/Container/Container";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const navigate = useNavigate();
  const orders = useSelector(selectOrders);
  console.log("🚀 ~ OrdersPage ~ orders:", orders);

  return (
    <div className={css.sectionList}>
      <Container className={css.wrapList}>
        <h2 className={css.title}>My orders</h2>
        <ul className={css.orderList}>
          {orders.map((order, index) => (
            <li key={index} className={css.orderCard}>
              <strong>Order number: </strong>
              {order._id}
              <strong>Car Id: </strong>
              {order.carId}
              <strong>Booking date:</strong>
              {order.bookingDate}
              <strong>Order confirmed:</strong>{" "}
              <span style={{ color: order.isConfirmed ? "green" : "red" }}>
                {order.isConfirmed ? "Yes" : "No"}
              </span>
              <strong>Order created:</strong>
              {order.createdAt}
              <Button
                size="btnFillLarge"
                className={css.orderDetails}
                onClick={() => {
                  navigate(`/orders/${order.carId}/${order._id}`);
                }}
              >
                Order details
              </Button>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
