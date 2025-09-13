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
      selected={field.value ? new Date(field.value) : null}
      onChange={(val) => {
        const isoDate = val ? val.toISOString() : null;
        setFieldValue(field.name, isoDate);
      }}
      dateFormat="yyyy-MM-dd"
      placeholderText="Booking date"
    />
  );
}
