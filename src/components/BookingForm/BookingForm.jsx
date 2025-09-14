import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import DatePickerField from "./DatePickerField/DatePickerField";
import css from "./BookingForm.module.css";
import ErrorPlaceholder from "../../utils/ErrorPlaceholder/ErrorPlaceholder";
import { Button } from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddOrders } from "../../redux/orders/operations";
import { toast } from "react-toastify";
import { selectError, selectLoading } from "../../redux/orders/selectors";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function BookingForm({ carId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const initialValues = {
    name: "",
    email: "",
    bookingDate: null,
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(16, "Too Long! Max 16 character")
      .required("Field is required"),
    email: Yup.string()
      .email("Not valid email")
      .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, "Not valid email")
      .max(128, "Too Long! Max-128 character")
      .required("Field is required"),
    bookingDate: Yup.date().min(new Date(), "Date must be today or later"),
    comment: Yup.string()
      .min(3, "Too Short!")
      .max(500, "Too Long! Max 500 character"),
  });

  return (
    <div className={css.formWrap}>
      {isLoading && <Loader />}
      <h3 className={css.titleForm}>Book your car now</h3>
      <p className={css.txtForm}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const payload = { ...values, carId };
          console.log("🚀 ~ BookingForm ~ payload:", payload);
          dispatch(fetchAddOrders(payload))
            .unwrap()
            .then((response) => {
              resetForm();
              toast.success("Order create successful");
              const orderId = response.data._id;
              console.log("🚀 ~ BookingForm ~ orderId:", orderId)
              navigate(`/orders/${carId}/${orderId}`);
            })
            .catch((error) => {
              toast.error(`Error: ${error.message}`);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <Field
              className={css.field}
              type="text"
              name="name"
              placeholder="Name*"
              aria-label="Name"
            />
            <ErrorPlaceholder name="name" />
            <Field
              className={css.field}
              type="email"
              name="email"
              placeholder="Email*"
              aria-label="Email"
            />
            <ErrorPlaceholder name="email" />

            <DatePickerField
              className={css.field}
              name="bookingDate"
              placeholder="Booking date"
              aria-label="Booking date"
            />
            <ErrorPlaceholder name="bookingDate" />
            <Field
              as="textarea"
              type="text"
              aria-label="comment"
              name="comment"
              placeholder="Comment"
              className={css.area}
            />
            <ErrorPlaceholder name="comment" />
            <Button
              type="submit"
              disabled={isSubmitting}
              size="btnFill"
              className={css.btnSend}
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
