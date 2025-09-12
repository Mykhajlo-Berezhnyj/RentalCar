import { useSelector } from "react-redux";
import {
  selectCars,
  selectError,
  selectisLoading,
} from "../../redux/cars/selectors";
import css from "./CarList.module.css";
import CarCard from "../CarCard/CarCard";

export default function CardList() {
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectisLoading);
  const error = useSelector(selectError);


  return (
    <>
      {cars.length === 0 && !isLoading && (
        <p>No cars found. Try adjusting filters.</p>
      )}
      <ul className={css.listCar}>
        {cars.map((car, index) => (
          <li className={css.cardCar} key={car.id}>
            <CarCard car={car} index={index} />
          </li>
        ))}
      </ul>
      {isLoading && <p className={css.loading}>Loading cars...</p>}
    </>
  );
}
