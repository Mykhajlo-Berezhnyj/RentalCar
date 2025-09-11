import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import DatePickerField from "./DatePickerField/DatePickerField";
import css from "./BookingForm.module.css";
import ErrorPlaceholder from "../../utils/ErrorPlaceholder/ErrorPlaceholder";
import { Button } from "../Button/Button";

export default function BookingForm() {
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
      <h3 className={css.titleForm}>Book your car now</h3>
      <p className={css.txtForm}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
            <Button type="submit" disabled={isSubmitting} size="btnFill" className={css.btnSend}>
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
