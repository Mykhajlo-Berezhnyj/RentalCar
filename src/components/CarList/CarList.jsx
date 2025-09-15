import css from "./CarList.module.css";
import CarCard from "../CarCard/CarCard";

export default function CardList({cars}) {
 
  return (
    <>
      <ul className={css.listCar}>
        {cars.map((car, index) => (
          <li className={css.cardCar} key={car.id}>
            <CarCard car={car} index={index} />
          </li>
        ))}
      </ul>
    </>
  );
}
