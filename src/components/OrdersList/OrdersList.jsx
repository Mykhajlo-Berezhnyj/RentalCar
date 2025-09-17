import { useNavigate } from "react-router-dom";
import css from "./OrdersList.module.css";
import { Button } from "../Button/Button";

export default function OrderList({ orders }) {
  const navigate = useNavigate();

  return (
    <div className={css.sectionList}>
      {orders.length > 0 ? (
        <div className={css.wrapList}>
          <h2 className={css.title}>My orders</h2>
          <ul className={css.orderList}>
            {orders.map((order, index) => (
              <li key={index} className={css.orderCard}>
                <div className={css.txtCard}>
                  <strong>Order number: </strong>
                  {order._id}
                  <strong>Car Id: </strong>
                  {order.carId}
                  <strong>Order confirmed:</strong>{" "}
                  <span style={{ color: order.isConfirmed ? "green" : "red" }}>
                    {order.isConfirmed ? "Yes" : "No"}
                  </span>
                  <strong>Order created:</strong>
                  {order.createdAt}
                </div>
                <Button
                  size="btnFillLarge"
                  className={css.orderDetails}
                  aria-label="Go to detail order page"
                  onClick={() => {
                    navigate(`/orders/${order.carId}/${order._id}`);
                  }}
                >
                  Order details
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No orders item</p>
      )}
    </div>
  );
}
