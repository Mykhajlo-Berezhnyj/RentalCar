import { useSelector } from "react-redux";
import { selectOrders } from "../../redux/orders/selectors";
import css from "./OrderDetails.module.css";
import { useParams, useSearchParams } from "react-router-dom";

export default function OrderDetails({ orderId }) {
  const orders = useSelector(selectOrders);
  //якщо зайшов по посиланню з іншого пристрою берем дані замовлення з url
  const { orderId: urlOrderId, carId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  orderId = orderId || urlOrderId;

  const order = orders.find((order) => {
    return order._id === orderId;
  });

  const fields = [
    { label: "Number order", key: "_id" },
    { label: "Car id", key: "carId" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Booking start Date", key: "BookingStartDate", format: true },
    { label: "Booking end Date", key: "BookingEndDate", format: true },
    { label: "Comment", key: "comment" },
    {
      label: "Order status",
      key: "isConfirmed",
      type: "status",
      icons: { true: "V -", false: "X -" },
      colors: { true: "green", false: "red" },
      text: { true: "Confirmed", false: "No confirmed" },
    },
    { label: "Order created", key: "createdAt", format: true },
    { label: "Order updated", key: "updatedAt", format: true },
  ];

  if (!order && !token) {
    return <p>Order notFound</p>;
  }
  if (!order && orderId && token) {
    return (
      <p className={css.infoMessage}>
        No information found for order <strong>{orderId}</strong>. You might be
        accessing this link from a new device. To confirm your order, please
        press the button below.
      </p>
    );
  }

  return (
    <div className={css.wrapDetails}>
      <h2>Order details:</h2>
      <ul className={css.listDetail}>
        {fields.map(({ label, key, format, type, icons, colors, text }) => {
          const value = order[key];
          if (value === "" || value === undefined) return null;

          let display = value;
          if (format) display = new Date(value).toLocaleString();
          if (type === "status") {
            const status = Boolean(value);
            display = (
              <span
                title="Requires confirmed of order by email"
                style={{ color: colors[status] }}
              >
                {icons[status]} {text[status]}
              </span>
            );
          }

          return (
            <li key={key}>
              <strong>{label}:</strong> {display}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
