import { useFormikContext } from "formik";
import css from "./ErrorPlaceholder.module.css";

export default function ErrorPlaceholder({ name }) {
  const { errors, touched } = useFormikContext();
  const showError = touched[name] && errors[name];

  return <div className={css.error}>{showError ? errors[name] : "\u00A0"}</div>;
}
