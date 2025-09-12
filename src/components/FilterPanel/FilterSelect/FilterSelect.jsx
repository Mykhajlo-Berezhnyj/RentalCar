import clsx from "clsx";
import css from "./FilterSelect.module.css";
import Select from "react-select";
import { customSelectStyles } from "./selectStyles";

export default function FilterSelect({
  label,
  name,
  disabledValue,
  array,
  className,
  onChange,
}) {
  const options = array.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <div className={clsx(css.selectFilter, className)}>
      <label htmlFor={name} className={css.label}>
        {label}
      </label>
      <Select
        inputId={name}
        name={name}
        options={options}
        placeholder={disabledValue}
        onChange={onChange}
        classNamePrefix="custom-select"
        styles={customSelectStyles}
        formatOptionLabel={(option, { context }) => {
          if (context === "menu") {
            return option.value;
          }
          if (name === "price") {
            return `To $${option.value}`;
          }
          return option.value;
        }}
      />
    </div>
  );
}
