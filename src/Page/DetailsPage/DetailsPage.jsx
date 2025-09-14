import { useLocation, useParams } from "react-router-dom";
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
import OrderDetails from "../../components/OrderDetails/OrderDetails";

export default function DetailsPage() {
  const isLoading = useSelector(selectisLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const { carId, orderId } = useParams();
  const cars = useSelector(selectCars);
  const carFromStore = cars.find((car) => car.id === carId);
  const carCurrent = useSelector(selectCarCurrent);
  const location = useLocation();
  const isDetaisPage = location.pathname.includes("/catalog");
  const isOrdersPage = location.pathname.includes("/orders");

  const car = carFromStore || carCurrent;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!carFromStore) {
      dispatch(fetchCarById(carId));
    }
  }, [dispatch, carId]);

  if (isLoading) {
    return <Loader className={css.loader} />;
  }
  if (error) {
    return <p className={css.noResult}>{error}</p>;
  }
  if (!car) {
    return <Loader className={css.loader} />;
  }

  return (
    <>
      <div className={css.sectionCard}>
        <Container>
          <div className={css.wrapper}>
            <div className={css.wrapLeft}>
              <ImgCar car={car} />
              {isDetaisPage && (
                <BookingForm carId={carId} className={css.form} />
              )}
              {isOrdersPage && (
                <OrderDetails
                  carId={carId}
                  orderId={orderId}
                  className={css.form}
                />
              )}
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
    </>
  );
}
