import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { useEffect, useState } from "react";
import SectionBase from "../../components/CarDetails/SectionBase/SectionBase";
import SectionConditions from "../../components/CarDetails/SectionConditions/SectionConditions";
import CarSpecifications from "../../components/CarDetails/CarSpecifications/CarSpecifications";
import CarAccessories from "../../components/CarDetails/CarAccessories/CarAccessories";
import ImgCar from "../../components/CarDetails/ImgCar/ImgCar";
import Loader from "../../components/Loader/Loader";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { fetchConfirmOrders } from "../../redux/orders/operations";
import { Button } from "../../components/Button/Button";
import { toast } from "react-toastify";
import { selectLoading } from "../../redux/orders/selectors";

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
  const token = new URLSearchParams(location.search).get("token");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const isloadConfirm = useSelector(selectLoading);
  const navigate = useNavigate();

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

  const handleConfirmClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await dispatch(fetchConfirmOrders(token)).unwrap();
      toast.success(
        <div>
          <p>Order {response._id} confirmed.</p>
          <p>We will contact you.</p>
        </div>
      );
      navigate(`/orders/${response.carId}/${response._id}`);
    } catch (error) {
      toast.error(
        `Failed to confirm order: ${error || "Server error or unknown issue"}`
      );
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

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
                <div>
                  <OrderDetails
                    carId={carId}
                    orderId={orderId}
                    className={css.form}
                  />
                  {token && (
                    <Button
                      size="btnFillLarge"
                      className={css.btnConfirm}
                      onClick={() => handleConfirmClick()}
                    >
                      Confirm order
                    </Button>
                  )}
                  {showConfirmDialog && (
                    <div className={css.confirmDialog}>
                      <p className={css.confirmTxt}>Are you sure you want to confirm this order?</p>
                      {isloadConfirm ? (
                        <Loader />
                      ) : (
                        <div className={css.dialogButtons}>
                          <Button onClick={handleConfirm}>Yes</Button>
                          <Button onClick={handleCancel}>No</Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={css.wrapRight}>
              <SectionBase car={car} className={css.sectionBase} />
              <div className={css.sectionParams}>
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
