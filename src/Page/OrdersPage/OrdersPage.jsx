import { useSelector } from "react-redux";
import { selectOrders } from "../../redux/orders/selectors";

export default function OrdersPage() {
  const orders = useSelector(selectOrders);
  console.log("🚀 ~ OrdersPage ~ orders:", orders);

  return (
    <div>
      <h2>My orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <p>{order._id}</p>
            <p>{order.carId}</p>
            <p>{order.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
