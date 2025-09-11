import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./DatePickerField.module.css";

export default function DatePickerField({ ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
      {...field}
      {...props}
      selected={
        field.value
          ? new Date(new Date(field.value).setHours(0, 0, 0, 0))
          : null
      }
      onChange={(val) => setFieldValue(field.name, val)}
      dateFormat="dd-MM-yyyy"
      placeholderText="Booking date"
    />
  );
}
