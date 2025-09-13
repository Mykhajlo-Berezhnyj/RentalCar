import { useSelector } from "react-redux";
import {
  selectCars,
  selectCarsStatus,
  selectError,
  selectisLoading,
} from "../../redux/cars/selectors";
import css from "./CarList.module.css";
import CarCard from "../CarCard/CarCard";
import Loader from "../Loader/Loader";

export default function CardList() {
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectisLoading);
  const status = useSelector(selectCarsStatus);
  const error = useSelector(selectError);

  return (
    <>
      {cars.length === 0 && status === "succeeded" && (
        <p className={css.noCars}>No cars found. Try adjusting filters.</p>
      )}
      {error && error}
      <ul className={css.listCar}>
        {cars.map((car, index) => (
          <li className={css.cardCar} key={car.id}>
            <CarCard car={car} index={index} />
          </li>
        ))}
      </ul>
      {(isLoading || status === "idle") && <Loader />}
    </>
  );
}
