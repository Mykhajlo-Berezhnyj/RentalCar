import { useSelector } from "react-redux";
import { selectCars } from "../../redux/cars/selectors";
import css from "./CarList.module.css";
import CarCard from "../CarCard/CarCard";

export default function CardList() {
  const cars = useSelector(selectCars);

  if (!cars || cars.length === 0) {
    return <p>Loading cars...</p>;
  }

  return (
    <ul className={css.listCar}>
      {cars.map((car, index) => (
        <li className={css.cardCar} key={car.id}>
          <CarCard car={car} index={index} />
        </li>
      ))}
    </ul>
  );
}
