import { toast, ToastContainer } from "react-toastify";
import { normalizeCarData } from "../../db/normalizeCarData";
import Icon from "../../Icon/Icon";
import css from "./SectionBase.module.css";

export default function SectionBase({ car, className }) {
  const { city, country, formattedKm } = normalizeCarData(car);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(car.id)
      .then(() =>
        toast.success("Id copied").catch(() => toast("Error copy, try again"))
      );
  };

  return (
    <div className={className}>
      <div className={css.baseInfo}>
        <h2>
          {car.brand} {car.model}, {car.year}
        </h2>
        <p
          title={`ID: ${car.id} (Click to copy)`}
          className={css.carId}
          onClick={handleCopy}
        >
          id: {car.id.slice(0, 6)}...
        </p>
        <ToastContainer position="top-center" autoClose={1000} />
      </div>
      <div className={css.geo}>
        <div className={css.location}>
          <Icon iconName="location" className={css.icon} />
          <p>
            {city}, {country}{" "}
          </p>
        </div>
        <p>{formattedKm} km</p>
      </div>
      <p className={css.price}>${car.rentalPrice}</p>
      <p className={css.description}>{car.description}</p>
    </div>
  );
}
