import clsx from "clsx";
import css from "./FilterSelect.module.css";
import Select from "react-select";
import { customSelectStyles } from "./selectStyles";
import { useEffect, useState } from "react";

export default function FilterSelect({
  label,
  name,
  disabledValue,
  array,
  value,
  className,
  onChange,
  error,
}) {
  const options = array.map((item) => ({
    value: item,
    label: item,
  }));

  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <div className={clsx(css.selectFilter, className)}>
      <label htmlFor={name} className="txtSecond">
        {label}
      </label>
      <Select
        inputId={name}
        name={name}
        options={options}
        placeholder={disabledValue}
        value={selectedOption}
        onChange={(option) => {
          onChange(option.value);
        }}
        error={error}
        classNamePrefix="custom-select"
        styles={customSelectStyles}
        formatOptionLabel={(option, { context }) => {
          if (context === "menu") {
            return option.value;
          }
          if (name === "rentalPrice") {
            return `To $${option.value}`;
          }
          return option.value;
        }}
      />
    </div>
  );
}
