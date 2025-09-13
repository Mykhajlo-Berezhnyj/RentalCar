import { useSelector } from "react-redux";
import { selectOrders } from "../../redux/orders/selectors";
import css from "./OrderDetails.module.css";

export default function OrderDetails({ orderId }) {
  const orders = useSelector(selectOrders);

  const order = orders.find((order) => {
    return order._id === orderId;
  });
  console.log("🚀 ~ OrderDetails ~ order:", order);

  const fields = [
    { label: "Number order", key: "_id" },
    { label: "Car id", key: "carId" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Booking date", key: "bookingDate", format: true },
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

  if (!order) {
    return <p>Order notFound</p>;
  }

  return (
    <div className={css.wrapDetails}>
      <h2>Order details:</h2>
      <ul className={css.listDetail}>
        {fields.map(({ label, key, format, type, icons, colors, text }) => {
          const value = order[key];
          if (value === "") return null;

          let display = value;
          if (format) display = new Date(value).toLocaleString();
          if (type === "status") {
            const status = Boolean(value);
            display = (
              <span style={{ color: colors[status] }}>
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
