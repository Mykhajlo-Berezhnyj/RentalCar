import { useParams } from "react-router-dom";
import BookingForm from "../../components/BookingForm/BookingForm";
import Container from "../../components/Container/Container";
import css from "./DetailsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCarCurrent,
  selectCars,
  selectError,
  selectisLoading,
} from "../../redux/cars/selectors";
import { fetchCarById } from "../../redux/cars/operation";
import { useEffect } from "react";
import SectionBase from "../../components/CarDetails/sectionBase/sectionBase";
import SectionConditions from "../../components/CarDetails/SectionConditions/SectionConditions";
import CarSpecifications from "../../components/CarDetails/CarSpecifications/CarSpecifications";
import CarAccessories from "../../components/CarDetails/CarAccessories/CarAccessories";
import ImgCar from "../../components/CarDetails/ImgCar/ImgCar";
import Loader from "../../components/Loader/Loader";

export default function DetailsPage() {
  const isLoading = useSelector(selectisLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const { id } = useParams();
  const cars = useSelector(selectCars);
  const carFromStore = cars.find((car) => car.id === id);
  const carCurrent = useSelector(selectCarCurrent);

  const car = carFromStore || carCurrent;

  useEffect(() => {
    if (!carFromStore) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader className={css.loader} />;
  } else if (!car) {
    return <Loader className={css.loader} />;
  } else if (error) {
    return <p className={css.noResult}>{error}</p>;
  }

  return (
    <div className={css.sectionCard}>
      <Container>
        <div className={css.wrapper}>
          <div className={css.wrapLeft}>
            <ImgCar car={car} />
            <BookingForm carId={id} className={css.form} />
          </div>
          <div className={css.wrapRight}>
            <SectionBase car={car} className={css.sectionBase} />
            <div className={css.sectionParametrs}>
              <SectionConditions car={car} />
              <CarSpecifications car={car} />
              <CarAccessories car={car} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
