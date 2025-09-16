import { useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./DatePickerField.module.css";

export default function DatePickerField({ ...props }) {
  const { setFieldValue, values } = useFormikContext();
  const start = values.BookingStartDate
    ? new Date(values.BookingStartDate)
    : null;
  const end = values.BookingEndDate ? new Date(values.BookingEndDate) : null;

  const handleChange = (dates) => {
    const [BookingStartDate, BookingEndDate] = dates;
    setFieldValue(
      "BookingStartDate",
      BookingStartDate ? BookingStartDate.toISOString() : undefined
    );
    setFieldValue(
      "BookingEndDate",
      BookingEndDate ? BookingEndDate.toISOString() : undefined
    );
  };

  return (
    <DatePicker
      selectsRange
      startDate={start}
      endDate={end}
      onChange={handleChange}
      minDate={new Date()}
      dateFormat="yyyy-MM-dd"
      placeholderText="Booking date"
      isClearable
      className={css.input}
    />
  );
}


